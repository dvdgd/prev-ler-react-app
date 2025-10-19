import { TSubscription } from "./subscription";

export enum EPaymentStatus {
  paid = "pago",
  processing = "processando",
  notPaid = "nao pago",
  open = "aberto",
  canceled = "cancelado"
}

export type TPayment = {
  paymentId?: number;
  subscriptionId: number;
  subscription?: Partial<TSubscription>;
  paymentDate?: Date;
  aproovedAt?: Date;
  openAt?: Date;
  value: number;
  status: EPaymentStatus;
}
