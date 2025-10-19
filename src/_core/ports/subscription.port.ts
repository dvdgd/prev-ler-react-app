import { TSubscription } from "@core/entities/subscription";

export interface ISubscriptionPort {
  getSubscriptionById(subscriptionId: number): Promise<TSubscription>;
  getAllSubscriptionsByCompanyId(companyId: string): Promise<TSubscription[]>;
  subscribePlan(companyId: string, planId: number): Promise<TSubscription>;
  changeSubscription(companyId: string, newPlanId: number, olderPlanId: number): Promise<Partial<TSubscription>>;
  updateExpirationDate(subscription: Partial<TSubscription>): Promise<void>;
}
