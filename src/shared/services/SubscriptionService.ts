import { EPaymentStatus } from "../../@types/payment";
import { TPlan } from "../../@types/plan";
import { ESubscriptionStatus, TSubscription, TSubscriptionRow } from "../../@types/subscription";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { SubscriptionFromSupabase } from "../mappers/SubscriptionSupabaseMapper";
import { PaymentService } from "./PaymentService";
import { PlanService } from "./PlanService";

export class SubscriptionService {
  constructor(
    private paymentService = new PaymentService(),
    private planService = new PlanService(),
  ) { }

  async getSubscriptionById(subscriptionId: number): Promise<TSubscription> {
    const { data: subscription } = await supabaseClient
      .from("assinatura")
      .select(`*, plano(*)`)
      .eq("id_assinatura", subscriptionId)
      .single();

    if (!subscription) {
      throw new BaseError({
        title: "Não foi possível encontrar a assinatura",
        description: "Verifique que você possui uma assinatura de plano.",
      });
    }

    return SubscriptionFromSupabase(subscription as TSubscriptionRow);
  }

  async getAllSubscriptionsByCompanyId(companyId: string): Promise<TSubscription[]> {
    const { data: subscriptions, error } = await supabaseClient
      .from("assinatura")
      .select(`*, plano(*), pagamento(*)`)
      .eq("id_empresa", companyId)
      .order('id_assinatura', { ascending: false })
      .order('id_pagamento', { foreignTable: 'pagamento', ascending: false })


    if (!subscriptions || error) {
      throw new BaseError({
        title: "Não foi possível encontrar a assinatura",
        description: "Verifique que você possui uma assinatura de plano.",
      });
    }

    return subscriptions?.map((s) => SubscriptionFromSupabase(s as TSubscriptionRow));
  }

  async subscribePlan(companyId: string, planId: number): Promise<TSubscription> {
    await this.paymentService.throwErrorIfCompanyHasAnyOfStatus();
    const newSubscription = await this.generateNewSubscription(companyId, planId);

    if (!newSubscription.subscriptionId) {
      throw new BaseError({
        title: "Erro inesperado ao criar nova assinatura",
        description: "Não foi possível recuperar as informações da nova assinatura",
      });
    }

    this.paymentService.generateNewPayment(newSubscription.subscriptionId);
    return newSubscription;
  }

  private async generateNewSubscription(companyId: string, planId: number, expirationDate = new Date()): Promise<TSubscription> {
    const { data, error } = await supabaseClient
      .from("assinatura")
      .insert({
        id_empresa: companyId,
        id_plano: planId,
        status_assinatura: ESubscriptionStatus.notPaid,
        data_inicio: expirationDate.toISOString(),
      })
      .select(`*, plano(*)`)
      .single();

    if (!data || error) {
      throw new BaseError({
        title: "Falha inexperada ao realizar a assinatura",
        description: "Desculpe, mas uma falha inexperada ocorreu ao assinar um plano.",
      });
    }

    return SubscriptionFromSupabase(data as TSubscriptionRow);
  }

  async changeSubscription(companyId: string, newPlanId: number, olderPlanId: number): Promise<Partial<TSubscription>> {
    await this.paymentService.throwErrorIfCompanyHasAnyOfStatus();
    let olderPlan: TPlan;
    try {
      olderPlan = await this.planService.getPlanById(olderPlanId);
    } catch (error) {
      return this.subscribePlan(companyId, newPlanId);
    }

    const dateNow = new Date();
    const olderSubscriptions = await this.cancelAllSubscriptionsByCompanyId(companyId);
    const monthsDiff = this.getMonthsDiff(olderSubscriptions);

    let expirationDate = new Date();
    if (monthsDiff > 0) {
      expirationDate.setMonth(expirationDate.getMonth() + monthsDiff)
    } else {
      expirationDate = this.calculateNewExpirationDate(dateNow, olderPlan.periodicy);
    }

    const newSubscription = await this.generateNewSubscription(companyId, newPlanId, expirationDate);
    const newPlan = newSubscription.plan;

    if (
      !newSubscription ||
      !newSubscription.subscriptionId ||
      !newPlan?.value
    ) {
      throw new BaseError({
        title: "Erro inesperado ao criar nova assinatura",
        description: "Não foi possível recuperar as informações da nova assinatura",
      });
    }

    const proRataPaymentValue = this.calculateProRataValue(monthsDiff, newPlan.value, olderPlan.value);

    if (proRataPaymentValue > 0) {
      await supabaseClient
        .from("pagamento")
        .insert({
          data_abertura: dateNow.toISOString(),
          id_assinatura: newSubscription.subscriptionId,
          status_pagamento: EPaymentStatus.notPaid,
          valor_pagamento: proRataPaymentValue,
        });
    } else {
      await supabaseClient
        .from("assinatura")
        .update({
          status_assinatura: ESubscriptionStatus.active,
        })
        .eq("id_assinatura", newSubscription.subscriptionId);

      newSubscription.status = ESubscriptionStatus.active;
    }

    return newSubscription;
  }

  private async cancelAllSubscriptionsByCompanyId(companyId: string): Promise<TSubscription[]> {
    const { data, error } = await supabaseClient
      .from("assinatura")
      .update({
        data_fim: new Date().toISOString(),
        status_assinatura: ESubscriptionStatus.canceled
      })
      .eq("id_empresa", companyId)
      .select(`*`);

    if (error) {
      throw new BaseError({
        title: "Não foi possível atualizar as assinaturas.",
        description: "Ocorreu um erro ao cancelar as assinaturas da empresa."
      });
    }

    return data.map((subsc) => SubscriptionFromSupabase(subsc));
  }

  private getMonthsDiff(subscriptions: TSubscription[]) {
    const dateNow = new Date();
    if (subscriptions.length <= 0) return 0;
    const monthsDiff = subscriptions
      .map(({ expirationDate }) => {
        const expDate = expirationDate ? new Date(expirationDate) : dateNow;
        return this.calculateMonthDiff(expDate, dateNow);
      })
      .reduce((acc, curr) => acc += curr);
    return monthsDiff;
  }

  private calculateMonthDiff(startDate: Date, finalDate: Date) {
    let months;
    months = (finalDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += finalDate.getMonth();
    return months <= 0 ? 0 : months;
  }

  private calculateProRataValue(monthsDiff: number, newPlanValue: number, olderPlanValue: number) {
    const monthsToMultiply = monthsDiff <= 0 ? 1 : monthsDiff;
    const proRataValue = (newPlanValue * monthsToMultiply) - (olderPlanValue * monthsToMultiply);
    return proRataValue;
  }

  async updateExpirationDate(subscription: Partial<TSubscription>) {
    if (
      !subscription.subscriptionId ||
      !subscription.plan?.periodicy
    ) {
      throw new BaseError({ title: "Erro ao atualizar assinatura" });
    }

    const olderExpirationDate = subscription.expirationDate;
    const planPeriodicy = subscription.plan.periodicy;
    const newExpirationDate = this.calculateNewExpirationDate(olderExpirationDate || new Date(), planPeriodicy);

    const { error } = await supabaseClient
      .from("assinatura")
      .update({
        status_assinatura: ESubscriptionStatus.active,
        data_expiracao: newExpirationDate.toISOString()
      })
      .eq("id_assinatura", subscription.subscriptionId);

    if (error) {
      throw new BaseError({
        title: "Ops, ocorreu um erro inesperado",
        description: "Não foi possivel atualizar a data de expiracão da assinatura. Por favor tente novamente mais tarde."
      });
    }
  }

  private calculateNewExpirationDate(olderExpirationDate: Date, planPeriodicy: string): Date {
    const dateNow = new Date();
    const currExpirationDate = new Date(olderExpirationDate);
    const isMonthly = planPeriodicy === "mensais"
    const qtdMonthsToAdd = isMonthly ? 1 : 12;

    if (currExpirationDate < dateNow) {
      const newExpDate = new Date(currExpirationDate);
      newExpDate.setMonth(currExpirationDate.getMonth() + qtdMonthsToAdd);
      return newExpDate;
    } else {
      const expDate = new Date();
      expDate.setMonth(dateNow.getMonth() + qtdMonthsToAdd);
      return expDate;
    }
  }
}
