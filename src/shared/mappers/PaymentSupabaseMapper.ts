import { EPaymentStatus, TPayment, TPaymentSupabaseInsert } from "../../@types/payment";
import { PlanFromSupabase } from "./PlanSupabaseMapper";

function formatDate(dateStr: string | undefined): string | undefined {
  if (dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  return undefined;
}

export function paymentToSupabase(payment: TPayment): TPaymentSupabaseInsert {
  return {
    data_pagamento: payment.paymentDate || undefined,
    id_assinatura: payment.subscriptionId,
    id_pagamento: payment.paymentId || undefined,
    status_pagamento: payment.status,
    valor_pagamento: payment.value
  };
}

export function paymentFromSupabase(paymentSupabaseInsert: TPaymentSupabaseInsert): TPayment {
  const formattedDate = formatDate(paymentSupabaseInsert.data_pagamento);

  return {
    paymentId: paymentSupabaseInsert.id_pagamento || undefined,
    subscriptionId: paymentSupabaseInsert.id_assinatura,
    status: paymentSupabaseInsert.status_pagamento as EPaymentStatus,
    plan: PlanFromSupabase(planSupabase: TPlanSupabaseRow).title paymentSupabaseInsert.id_assinatura,
    value: paymentSupabaseInsert.valor_pagamento,
    paymentDate: formattedDate
  };
}


