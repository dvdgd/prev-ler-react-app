import { Database } from "./database.types";

type TSubscriptionSupabase = Database['public']['Tables']['assinatura'];

export type TSubscriptionStatusSupabase = Database["public"]["Enums"]["status_assinatura"];
export type TSubscriptionInsert = TSubscriptionSupabase['Insert']
export type TSubscriptionRow = TSubscriptionSupabase['Row']

export enum ESubscriptionStatus {
  active = "ativo",
  notPaid = "nao paga",
  canceled = "cancelada"
}

export type TSubscription = {
  subscriptionId?: number;
  endDate?: Date;
  startDate?: Date;
  planId: number;
  subscriptionStatus: ESubscriptionStatus
}
