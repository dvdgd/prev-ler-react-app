import { ESubscriptionStatus, TSubscription, TSubscriptionInsert, TSubscriptionRow } from "../../@types/subscription";
import { PartialCompanyFromSupabase } from "./CompanySupabaseMappers";
import { PartialPlanFromSupabase } from "./PlanSupabaseMapper";

export function subscriptionToSupabase(subscription: TSubscription): TSubscriptionInsert {
  return {
    data_fim: subscription.endDate?.toISOString() || null,
    data_inicio: subscription.startDate?.toISOString() || undefined,
    id_assinatura: subscription.subscriptionId || undefined,
    id_empresa: subscription.companyId.toString(),
    id_plano: subscription.planId,
    status_assinatura: subscription.subscriptionStatus
  };
}

export function subscriptionFromSupabase(subscriptionRow: TSubscriptionRow): TSubscription {
  return {
    subscriptionId: subscriptionRow.id_assinatura || undefined,
    endDate: subscriptionRow.data_fim ? new Date(subscriptionRow.data_fim) : undefined,
    startDate: subscriptionRow.data_inicio ? new Date(subscriptionRow.data_inicio) : undefined,
    companyId: subscriptionRow.id_empresa?.toString() ?? '0',
    planId: subscriptionRow.id_plano ?? 0,
    subscriptionStatus: subscriptionRow.status_assinatura as ESubscriptionStatus
  };
}

export function partialSubscriptionFromSupabase(subscriptionRow: Partial<TSubscriptionRow> | undefined): Partial<TSubscription> {
  return {
    subscriptionId: subscriptionRow?.id_assinatura || undefined,
    endDate: subscriptionRow?.data_fim ? new Date(subscriptionRow?.data_fim) : undefined,
    startDate: subscriptionRow?.data_inicio ? new Date(subscriptionRow?.data_inicio) : undefined,
    companyId: subscriptionRow?.id_empresa?.toString() ?? '0',
    plan: PartialPlanFromSupabase(subscriptionRow?.plano),
    company: PartialCompanyFromSupabase(subscriptionRow?.empresa),
    planId: subscriptionRow?.id_plano,
    subscriptionStatus: subscriptionRow?.status_assinatura as ESubscriptionStatus
  };
}
