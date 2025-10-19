import { TPayment, EPaymentStatus } from "@core/entities/payment";

export interface IPaymentPort {
  getAllPayments(): Promise<TPayment[]>;
  getPaymentsBySubscriptionId(subscriptionId: number): Promise<TPayment[]>;
  getPaymentById(paymentId: number): Promise<TPayment>;
  notifyPaymentToAdmin(payment: TPayment): Promise<TPayment>;
  generateNewPayment(subscriptionId: number): Promise<TPayment>;
  generateNewPaymentWithProRata(subscriptionId: number, proRataValue: number): Promise<TPayment>;
  recognizeCompanyPayment(paymentId: number): Promise<TPayment>;
  contestCompanyPayment(paymentId: number): Promise<TPayment>;
  throwErrorIfCompanyHasAnyOfStatus(status: EPaymentStatus[], companyId: string): Promise<void>;
}