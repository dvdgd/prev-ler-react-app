import { TCompanySupabaseRow } from "./company";
import { Database } from "./database.types";
import { TPaymentSupabaseRow } from "./payment";
import { TPlanSupabaseRow } from "./plan";

type TSubscriptionSupabase = Database['public']['Tables']['assinatura'];

export type TSubscriptionStatusSupabase = Database["public"]["Enums"]["status_assinatura"];
export type TSubscriptionInsert = TSubscriptionSupabase['Insert']
export type TSubscriptionUpdate = TSubscriptionSupabase['Update']
export type TSubscriptionRow = TSubscriptionSupabase['Row'] & {
  plano?: Partial<TPlanSupabaseRow>,
  empresa?: Partial<TCompanySupabaseRow>,
  pagamento?: TPaymentSupabaseRow[]
}
