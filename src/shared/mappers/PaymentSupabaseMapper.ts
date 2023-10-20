import { EPaymentStatus, TPayment, TPaymentSupabaseInsert } from "../../@types/payment";

export function paymentToSupabase(payment: TPayment): TPaymentSupabaseInsert {
  return {
    data_pagamento: payment.paymentDate?.toISOString() || undefined,
    id_assinatura: payment.subscriptionId,
    id_pagamento: payment.paymentId || undefined,
    status_pagamento: payment.status,
    valor_pagamento: payment.value
  };
}

export function paymentFromSupabase(paymentSupabaseInsert: TPaymentSupabaseInsert): TPayment {
  return {
    paymentId: paymentSupabaseInsert.id_pagamento || undefined,
    subscriptionId: paymentSupabaseInsert.id_assinatura,
    status: paymentSupabaseInsert.status_pagamento as EPaymentStatus,
    value: paymentSupabaseInsert.valor_pagamento,
    paymentDate: paymentSupabaseInsert.data_pagamento
      ? new Date(paymentSupabaseInsert.data_pagamento)
      : undefined
  };
}
