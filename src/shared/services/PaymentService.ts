import { EPaymentStatus, TPayment, TPaymentSupabaseRow } from "../../@types/payment";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { PaymentFromSupabase } from "../mappers/PaymentSupabaseMapper";
import { SubscriptionService } from "./SubscriptionService";

export class PaymentService {
  private subscriptionService: SubscriptionService;
  constructor() {
    this.subscriptionService = new SubscriptionService(this)
  }

  async getAllPayments(): Promise<TPayment[]> {
    const { data } = await supabaseClient
      .from('pagamento')
      .select(`*, assinatura (*, plano (*), empresa(*))`)
      .order('data_abertura', { ascending: false });

    if (!data) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao buscar informações sobre o pagamento. Por favor tente novamente mais tarde.'
      });
    }

    return data.map(p => PaymentFromSupabase(p as TPaymentSupabaseRow));
  }

  async getPaymentsBySubscriptionId(subscriptionId: number): Promise<TPayment[]> {
    const { data, error } = await supabaseClient
      .from('pagamento')
      .select(`*`)
      .order('data_abertura', { ascending: false })
      .eq("id_assinatura", subscriptionId);

    if (!data || error) {
      throw new BaseError({
        title: "Erro interno no servidor",
        description: `Não foi possível recuperar os pagamentos da assinatura #${subscriptionId}.`
      });
    }

    return data.map((p) => PaymentFromSupabase(p));
  }

  async getPaymentById(paymentId: number) {
    const { data } = await supabaseClient
      .from('pagamento')
      .select(`*, assinatura (*, plano (*))`)
      .eq("id_pagamento", paymentId)
      .single();

    if (!data) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao buscar informações sobre o pagamento. Por favor tente novamente mais tarde.'
      });
    }

    return PaymentFromSupabase(data as TPaymentSupabaseRow);
  }

  async notifyPaymentToAdmin({ paymentId }: TPayment): Promise<TPayment> {
    const payment = await this.getPaymentById(paymentId!)
    const acceptStatus = [
      EPaymentStatus.notPaid,
      EPaymentStatus.open,
    ];

    if (!acceptStatus.includes(payment.status)) {
      throw new BaseError({
        title: "Não foi possível concluir essa ação",
        description: "Você não pode avisar uma pagamento que esteja não pago."
      });
    }

    const { data, error } = await supabaseClient
      .from("pagamento")
      .update({
        data_pago: new Date().toISOString(),
        status_pagamento: EPaymentStatus.processing,
      })
      .eq("id_pagamento", payment.paymentId ?? 0)
      .select(`*, assinatura(*, plano(*))`)
      .single();

    if (!data || error) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao avisar o pagamento. Por favor tente novamente mais tarde.'
      });
    }

    return PaymentFromSupabase(data as TPaymentSupabaseRow);
  }

  async generateNewPayment(subscriptionId: number): Promise<TPayment> {
    const subscription = await this.subscriptionService.getSubscriptionById(subscriptionId);

    if (
      !subscription.plan?.value ||
      !subscription.subscriptionId
    ) {
      throw new BaseError({
        title: "Não foi possível encontrar a assinatura",
        description: "Verifique que você possui uma assinatura de plano.",
      });
    }

    const { data, error } = await supabaseClient
      .from("pagamento")
      .insert({
        id_assinatura: subscription.subscriptionId,
        status_pagamento: EPaymentStatus.notPaid,
        valor_pagamento: subscription.plan.value,
        data_abertura: new Date().toISOString(),
      })
      .select(`*, assinatura(*, plano(*))`)
      .single();

    if (!data || error) {
      throw new BaseError({
        title: "Ocorreu um erro ao gerar um novo pagamento",
      });
    }

    return PaymentFromSupabase(data as TPaymentSupabaseRow);
  }

  async generateNewPaymentWithProRata(subscriptionId: number, proRataValue: number): Promise<TPayment> {
    const { data, error } = await supabaseClient
      .from("pagamento")
      .insert({
        id_assinatura: subscriptionId,
        status_pagamento: EPaymentStatus.notPaid,
        valor_pagamento: proRataValue,
        data_abertura: new Date().toISOString(),
      })
      .select(`*, assinatura(*, plano(*))`)
      .single();

    if (!data || error) {
      throw new BaseError({
        title: "Ocorreu um erro ao gerar um novo pagamento",
      });
    }

    return PaymentFromSupabase(data as TPaymentSupabaseRow);
  }

  async recognizeCompanyPayment(paymentId: number): Promise<TPayment> {
    const payment = await this.getPaymentById(paymentId);
    if (payment.status !== EPaymentStatus.processing) {
      throw new BaseError({
        title: "Não foi possível atualizar o pagamento",
        description: "O pagamento não está esperando aprovação"
      });
    }

    if (!payment.subscription) {
      throw new BaseError({
        title: "Erro ao recuperar informacões da assinatura.",
        description: "Não foi possível encontrar a assinatura do pagamento."
      })
    }

    const { data: paymentUpdated, error } = await supabaseClient
      .from("pagamento")
      .update({
        status_pagamento: EPaymentStatus.paid,
        data_aprovacao: new Date().toISOString(),
      })
      .eq("id_pagamento", paymentId)
      .eq("status_pagamento", EPaymentStatus.processing)
      .select(`*, assinatura(*, plano(*))`)
      .single();

    try {
      await this.throwErrorIfCompanyHasAnyOfStatus([
        EPaymentStatus.notPaid,
        EPaymentStatus.processing,
      ]);
    } catch (error) {
      return PaymentFromSupabase(paymentUpdated as TPaymentSupabaseRow);
    }
    await this.subscriptionService.updateExpirationDate(payment.subscription);

    if (!paymentUpdated || error) {
      throw new BaseError({
        title: "Ops, ocorreu um erro inesperado",
        description: "Não foi possivel atualizar o pagamento para pago. Por favor tente novamente mais tarde"
      });
    }

    await this.generateNewPayment(payment.subscriptionId);
    return PaymentFromSupabase(paymentUpdated as TPaymentSupabaseRow);
  }

  async contestCompanyPayment(paymentId: number): Promise<TPayment> {
    const payment = await this.getPaymentById(paymentId);
    if (payment.status !== EPaymentStatus.processing) {
      throw new BaseError({
        title: "O pagamento não está pendente de aprovação.",
        description: "Você só pode constestar pagamentos que estão aguardando aprovação."
      });
    }

    const { data, error } = await supabaseClient
      .from("pagamento")
      .update({
        status_pagamento: EPaymentStatus.notPaid,
      })
      .eq("id_pagamento", paymentId)
      .eq("status_pagamento", EPaymentStatus.processing)
      .select(`*, assinatura(*, plano(*))`)
      .single();

    if (!data || error) {
      throw new BaseError({
        title: "Ops, ocorreu um erro ao atualizar o pagamento",
        description: "Por favor, tente novamente mais tarde"
      });
    }

    return PaymentFromSupabase(data as TPaymentSupabaseRow);
  }

  async throwErrorIfCompanyHasAnyOfStatus(status = [EPaymentStatus.processing]): Promise<void> {
    const { data: pendingPayments } = await supabaseClient
      .from("pagamento")
      .select()
      .in("status_pagamento", status);

    if (!pendingPayments || pendingPayments.length <= 0) return;

    throw new BaseError({
      title: "Você ainda possui pagamentos pendentes",
      description: "Você só pode trocar de assinatura quando não houver mais pagamentos em processamento."
    });
  }
}
