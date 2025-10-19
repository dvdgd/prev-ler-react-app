import { TPartialCompany } from "./company";
import { TPayment } from "./payment";
import { TPlan } from "./plan";

export enum ESubscriptionStatus {
  active = "ativo",
  notPaid = "pendente_pagamento",
  canceled = "cancelada"
}

export type TSubscription = {
  subscriptionId?: number;
  companyId: string;
  plan?: Partial<TPlan>,
  company?: TPartialCompany,
  payments?: TPayment[]
  endDate?: Date;
  expirationDate?: Date;
  startDate?: Date;
  planId: number;
  status: ESubscriptionStatus
}
