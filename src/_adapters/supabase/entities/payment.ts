import { Database } from "./database.types";
import { TSubscriptionRow } from "./subscription";

type TPaymentSupabase = Database['public']['Tables']['pagamento']

export type TPaymentSupabaseInsert = TPaymentSupabase['Insert'];
export type TPaymentSupabaseRow = TPaymentSupabase['Row'] & {
  assinatura?: Partial<TSubscriptionRow>
};

export type TPaymentStatusSupabase = Database["public"]["Enums"]["status_pagamento"]

