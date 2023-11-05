import { EPaymentStatus, TPayment, TPaymentSupabaseInsert, TPaymentSupabaseRow } from "../../@types/payment";
import { PartialSubscriptionFromSupabase } from "./SubscriptionSupabaseMapper";

export function PaymentToSupabase(payment: TPayment): TPaymentSupabaseInsert {
  return {
    data_pagamento: payment.paymentDate?.toISOString() || undefined,
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
    paymentDate: new Date(paymentSupabaseRow.data_pagamento),
  };
}
