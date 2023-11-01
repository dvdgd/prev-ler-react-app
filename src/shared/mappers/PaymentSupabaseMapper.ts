import { EPaymentStatus, TPayment, TPaymentSupabaseInsert, TPaymentSupabaseRow } from "../../@types/payment";
import { partialSubscriptionFromSupabase } from "./SubscriptionSupabaseMapper";

export function paymentToSupabase(payment: TPayment): TPaymentSupabaseInsert {
  return {
    data_pagamento: payment.paymentDate?.toISOString() || undefined,
    id_assinatura: payment.subscriptionId,
    id_pagamento: payment.paymentId || undefined,
    status_pagamento: payment.status,
    valor_pagamento: payment.value
  };
}

export function paymentFromSupabase(paymentSupabaseRow: TPaymentSupabaseRow): TPayment {
  return {
    paymentId: paymentSupabaseRow.id_pagamento || undefined,
    subscriptionId: paymentSupabaseRow.id_assinatura,
    subscription: partialSubscriptionFromSupabase(paymentSupabaseRow.subscription),
    status: paymentSupabaseRow.status_pagamento as EPaymentStatus,
    value: paymentSupabaseRow.valor_pagamento,
    paymentDate: new Date(paymentSupabaseRow.data_pagamento),
  };
}
