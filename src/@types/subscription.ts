import { TCompanySupabaseRow, TPartialCompany } from "./company";
import { Database } from "./database.types";
import { TPlan, TPlanSupabaseRow } from "./plan";

type TSubscriptionSupabase = Database['public']['Tables']['assinatura'];

export type TSubscriptionStatusSupabase = Database["public"]["Enums"]["status_assinatura"];
export type TSubscriptionInsert = TSubscriptionSupabase['Insert']
export type TSubscriptionRow = TSubscriptionSupabase['Row'] & {
  plano?: Partial<TPlanSupabaseRow>,
  empresa?: Partial<TCompanySupabaseRow>,
}

export enum ESubscriptionStatus {
  active = "ativo",
  notPaid = "nao paga",
  canceled = "cancelada"
}

export type TSubscription = {
  subscriptionId?: number;
  companyId: string;
  plan?: Partial<TPlan>,
  company?: TPartialCompany,
  endDate?: Date;
  startDate?: Date;
  planId: number;
  status: ESubscriptionStatus
}
