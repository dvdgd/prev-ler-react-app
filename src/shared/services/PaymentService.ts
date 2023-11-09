import { EPaymentStatus, TPayment, TPaymentSupabaseRow } from "../../@types/payment";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { PaymentFromSupabase } from "../mappers/PaymentSupabaseMapper";

export class PaymentService {
  async getAllPayments(): Promise<TPayment[]> {
    const { data } = await supabaseClient
      .from('pagamento')
      .select(`
        data_pago,
        id_assinatura,
        id_pagamento,
        status_pagamento,
        valor_pagamento,
        assinatura (
          status_assinatura,
          data_inicio,
          data_fim,
          plano (
            titulo,
            valor_plano,
            qtd_max_usuarios,
            periodicidade,
            descricao
          )
        )
      `)
      .order('valor_pagamento', { ascending: true });

    if (!data) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao buscar informações sobre o pagamento. Por favor tente novamente mais tarde.'
      });
    }

    return data.map(p => PaymentFromSupabase(p as TPaymentSupabaseRow));
  }

  async getPaymentById(paymentId: string): Promise<TPayment> {
    const { data } = await supabaseClient
      .from('pagamento')
      .select()
      .eq("id_pagamento", paymentId)
      .single();

    if (!data) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao buscar informações sobre o pagamento. Por favor tente novamente mais tarde.'
      });
    }

    return PaymentFromSupabase(data);
  }

  async notifyPaymentToAdmin(payment: TPayment): Promise<void> {
    const acceptStatus = [
      EPaymentStatus.notPaid,
      EPaymentStatus.open,
    ];

    if (!acceptStatus.includes(payment.status)) {
      throw new BaseError({
        title: "Não foi possível concluir essa ação",
        description: "Você não pode avisar uma pagamento que não esteja aberto ou não pago."
      });
    }

    const { error } = await supabaseClient
      .from("pagamento")
      .update({
        data_pago: new Date().toISOString(),
        status_pagamento: EPaymentStatus.processing,
      })
      .eq("id_pagamento", payment.paymentId ?? 0);

    if (error?.code) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao avisar o pagamento. Por favor tente novamente mais tarde.'
      });
    }
  }
}
