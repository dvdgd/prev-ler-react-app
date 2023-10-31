import { Database } from "./database.types";
import { TPlan } from "./plan";

type TPaymentSupabase = Database['public']['Tables']['pagamento']

export type TPaymentSupabaseInsert = TPaymentSupabase['Insert'];
export type TPaymentSupabaseRow = TPaymentSupabase['Row'];
export type TPaymentStatusSupabase = Database["public"]["Enums"]["status_pagamento"]

export enum EPaymentStatus {
  paid = "pago",
  processing = "processando",
  notPaid = "nao pago"
}

export type TPayment = {
  paymentId?: number;
  subscriptionId: number;
  title: TPlan;
  status: EPaymentStatus;
  value: number;
  paymentDate?: string;

}
