import { ESubscriptionStatus, TSubscription, TSubscriptionInsert } from "../../@types/subscription";

export function subscriptionToSupabase(subscription: TSubscription): TSubscriptionInsert {
  return {
    data_fim: subscription.endDate?.toISOString() || null,
    data_inicio: subscription.startDate?.toISOString() || undefined,
    id_assinatura: subscription.subscriptionId || undefined,
    id_empresa: subscription.planId.toString(),
    id_plano: subscription.planId,
    status_assinatura: subscription.subscriptionStatus
  };
}

export function subscriptionFromSupabase(subscriptionInsert: TSubscriptionInsert): TSubscription {
  return {
    subscriptionId: subscriptionInsert.id_assinatura || undefined,
    endDate: subscriptionInsert.data_fim ? new Date(subscriptionInsert.data_fim) : undefined,
    startDate: subscriptionInsert.data_inicio ? new Date(subscriptionInsert.data_inicio) : undefined,
    planId: parseInt(subscriptionInsert.id_empresa, 10),
    subscriptionStatus: subscriptionInsert.status_assinatura as ESubscriptionStatus
  };
}
