import { TPlan } from "../../@types/plan";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { PlanFromSupabase, PlanToSupabase } from "../mappers/PlanSupabaseMapper";

export class PlanService {
  async createNewPlan(newPlan: TPlan): Promise<void> {
    const supabasePlan = PlanToSupabase(newPlan);

    const result = await supabaseClient
      .from("plano")
      .upsert(supabasePlan);

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

  async getPlanById(planId: number): Promise<TPlan> {
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

  async setPlanActive(planId: number, active: boolean) {
    const updateObj = { ativo: active };
    if (!active) {
      Object.assign(updateObj, { data_fim: new Date().toISOString() });
    }

    const { data, error } = await supabaseClient
      .from("plano")
      .update(updateObj)
      .eq("id_plano", planId)
      .select()
      .single();

    if (!data || error) {
      throw new BaseError({
        title: "Erro ao atualizar o plano",
        description: "Ocorreu um erro ao ativar/desativar o plano. Por favor, tente novamente mais tarde.",
      });
    }

    return PlanFromSupabase(data);
  }
}
