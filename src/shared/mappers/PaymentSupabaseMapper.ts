import { EPaymentStatus, TPayment, TPaymentSupabaseInsert, TPaymentSupabaseRow } from "../../@types/payment";
import { PartialSubscriptionFromSupabase } from "./SubscriptionSupabaseMapper";

export function PaymentToSupabase(payment: TPayment): TPaymentSupabaseInsert {
  return {
    data_pago: payment.paymentDate?.toISOString() || undefined,
    data_abertura: new Date().toISOString(),
    id_assinatura: payment.subscriptionId,
    id_pagamento: payment.paymentId || undefined,
    status_pagamento: payment.status,
    valor_pagamento: payment.value
  };
}

export function PaymentFromSupabase(paymentSupabaseRow: TPaymentSupabaseRow): TPayment {
  return {
    paymentId: paymentSupabaseRow.id_pagamento || undefined,
    subscriptionId: paymentSupabaseRow.id_assinatura,
    subscription: PartialSubscriptionFromSupabase(paymentSupabaseRow.assinatura),
    status: paymentSupabaseRow.status_pagamento as EPaymentStatus,
    value: paymentSupabaseRow.valor_pagamento,
    aproovedAt: paymentSupabaseRow.data_aprovacao
      ? new Date(paymentSupabaseRow.data_aprovacao)
      : undefined,
    openAt: paymentSupabaseRow.data_abertura
      ? new Date(paymentSupabaseRow.data_abertura)
      : undefined,
    paymentDate: paymentSupabaseRow.data_pago
      ? new Date(paymentSupabaseRow.data_pago)
      : undefined,
  };
}
