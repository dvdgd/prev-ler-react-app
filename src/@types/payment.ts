import { Database } from "./database.types";
import { TSubscription, TSubscriptionRow } from "./subscription";

type TPaymentSupabase = Database['public']['Tables']['pagamento']

export type TPaymentSupabaseInsert = TPaymentSupabase['Insert'];
export type TPaymentSupabaseRow = TPaymentSupabase['Row'] & {
  subscription?: Partial<TSubscriptionRow>
};

export type TPaymentStatusSupabase = Database["public"]["Enums"]["status_pagamento"]

export enum EPaymentStatus {
  paid = "pago",
  processing = "processando",
  notPaid = "nao pago"
}

export type TPayment = {
  paymentId?: number;
  subscriptionId: number;
  subscription?: Partial<TSubscription>;
  status: EPaymentStatus;
  value: number;
  paymentDate?: Date;
}
