import { TPayment } from "../../@types/payment";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { paymentFromSupabase } from "../mappers/PaymentSupabaseMapper";

export class PaymentService {
  async getAllPayments(): Promise<TPayment[]> {
    const { data } = await supabaseClient
      .from('pagamento')
      .select()
      .order('valor_pagamento', { ascending: true });

    if (!data) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao buscar informações sobre o pagamento. Por favor tente novamente mais tarde.'
      });
    }

    return data.map(p => paymentFromSupabase(p));
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

    return paymentFromSupabase(data);
  }
}
