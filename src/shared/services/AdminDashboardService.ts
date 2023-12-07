import { supabaseClient } from "@config/supabase";
import { BaseError } from "@shared/errors/BaseError";

export class AdminDashboardService {
  async getPaymentsGroupByMonthAndStatus(date: Date) {
    const searchDate = new Date(date);
    searchDate.setDate(1);

    const { data } = await supabaseClient
      .from('admin_qtd_status_pagamento_mes')
      .select('*')
      .eq('mes_abertura', searchDate.toISOString().split('T')[0]);

    if (!data || data.length === 0) {
      throw new BaseError({
        title: 'Ops... ocorreu um erro ao recuperar as informações do Dashboard',
        description: 'Não foi possível buscar os pagamentos mensais por status',
      });
    }

    return data.map((data) => {
      return {
        paymentStatus: data.status_pagamento as string,
        qtdStatus: data.qtd_status as number
      }
    })
  }
}
