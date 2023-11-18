import { ESubscriptionStatus, TSubscription, TSubscriptionInsert, TSubscriptionRow } from "../../@types/subscription";
import { PartialCompanyFromSupabase } from "./CompanySupabaseMappers";
import { PaymentFromSupabase } from "./PaymentSupabaseMapper";
import { PartialPlanFromSupabase } from "./PlanSupabaseMapper";

export function SubscriptionToSupabase(subscription: TSubscription): TSubscriptionInsert {
  return {
    data_fim: subscription.endDate?.toISOString(),
    data_inicio: subscription.startDate?.toISOString() || undefined,
    id_assinatura: subscription.subscriptionId || undefined,
    id_empresa: subscription.companyId.toString(),
    data_expiracao: subscription.expirationDate?.toISOString(),
    id_plano: subscription.planId,
    status_assinatura: subscription.status
  };
}

export function SubscriptionFromSupabase(subscriptionRow: TSubscriptionRow): TSubscription {
  return {
    subscriptionId: subscriptionRow.id_assinatura || undefined,
    endDate: subscriptionRow.data_fim ? new Date(subscriptionRow.data_fim) : undefined,
    startDate: subscriptionRow.data_inicio ? new Date(subscriptionRow.data_inicio) : undefined,
    plan: PartialPlanFromSupabase(subscriptionRow?.plano),
    company: PartialCompanyFromSupabase(subscriptionRow?.empresa),
    expirationDate: subscriptionRow.data_expiracao ? new Date(subscriptionRow.data_expiracao) : undefined,
    companyId: subscriptionRow.id_empresa?.toString() ?? '0',
    payments: subscriptionRow?.pagamento?.map((p) => PaymentFromSupabase(p)),
    planId: subscriptionRow.id_plano ?? 0,
    status: subscriptionRow.status_assinatura as ESubscriptionStatus
  };
}

export function PartialSubscriptionFromSupabase(subscriptionRow: Partial<TSubscriptionRow> | undefined): Partial<TSubscription> {
  return {
    subscriptionId: subscriptionRow?.id_assinatura || undefined,
    endDate: subscriptionRow?.data_fim ? new Date(subscriptionRow?.data_fim) : undefined,
    startDate: subscriptionRow?.data_inicio ? new Date(subscriptionRow?.data_inicio) : undefined,
    expirationDate: subscriptionRow?.data_expiracao ? new Date(subscriptionRow.data_expiracao) : undefined,
    companyId: subscriptionRow?.id_empresa?.toString() ?? '0',
    payments: subscriptionRow?.pagamento?.map((p) => PaymentFromSupabase(p)),
    plan: PartialPlanFromSupabase(subscriptionRow?.plano),
    company: PartialCompanyFromSupabase(subscriptionRow?.empresa),
    planId: subscriptionRow?.id_plano,
    status: subscriptionRow?.status_assinatura as ESubscriptionStatus
  };
}
