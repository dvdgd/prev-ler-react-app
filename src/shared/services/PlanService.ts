import { TPlan } from "../../@types/plan";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { PlanFromSupabase } from "../mappers/PlanSupabaseMapper";

export class PlanService {
  async getAllPlans(): Promise<TPlan[]> {
    const { data } = await supabaseClient
      .from('plano')
      .select()
      .order('valor_plano', { ascending: true });

    if (!data) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao buscar informações sobre o plano. Por favor tente novamente mais tarde.'
      });
    }

    return data.map(p => PlanFromSupabase(p));
  }

  async getPlanById(planId: string): Promise<TPlan> {
    const { data } = await supabaseClient
      .from('plano')
      .select()
      .eq("id_plano", planId)
      .single();

    if (!data) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao buscar informações sobre o plano. Por favor tente novamente mais tarde.'
      });
    }

    return PlanFromSupabase(data);
  }
}
