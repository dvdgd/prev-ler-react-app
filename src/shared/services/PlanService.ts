import { TPlan } from "../../@types/plan";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { PlanFromSupabase, PlanToSupabase } from "../mappers/PlanSupabaseMapper";

export class PlanService {
  async createNewPlan(newPlan: TPlan): Promise<void> {
    const supabasePlan = PlanToSupabase(newPlan);

    const result = await supabaseClient
      .from("plano")
      .insert(supabasePlan);

    if (result.status != 201) {
      throw new BaseError({
        title: "Erro interno no servidor.",
        description: "Ocorreu um erro ao salvar as informações do Plano."
      });
    }
  }

  async deletePlanById(planId: number): Promise<void> {
    const result = await supabaseClient
      .from('plano')
      .delete()
      .eq('id_plano', planId);

    if (result.status != 204) {
      throw new BaseError({
        title: "Erro interno no servidor.",
        description: "Ocorreu um erro ao excluir o Plano."
      });
    }
  }

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
