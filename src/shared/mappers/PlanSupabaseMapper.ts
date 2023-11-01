import { TPlan, TPlanSupabaseInsert, TPlanSupabaseRow } from "../../@types/plan";

export function PlanToSupabase(plan: TPlan): TPlanSupabaseInsert {
  return {
    ativo: plan.active,
    data_criacao: plan.createdAt?.toISOString() || undefined,
    data_fim: plan.endDate?.toISOString() || null,
    descricao: plan.description,
    id_plano: plan.planId || undefined,
    periodicidade: plan.periodicy,
    qtd_max_usuarios: plan.maxUsers,
    titulo: plan.title,
    valor_plano: plan.value
  };
}

export function PlanFromSupabase(planSupabase: TPlanSupabaseRow): TPlan {
  return {
    active: planSupabase.ativo,
    createdAt: planSupabase.data_criacao ? new Date(planSupabase.data_criacao) : undefined,
    endDate: planSupabase.data_fim ? new Date(planSupabase.data_fim) : undefined,
    description: planSupabase.descricao,
    planId: planSupabase.id_plano || undefined,
    periodicy: planSupabase.periodicidade,
    maxUsers: planSupabase.qtd_max_usuarios,
    title: planSupabase.titulo,
    value: planSupabase.valor_plano
  };
}

export function PartialPlanFromSupabase(planSupabase: Partial<TPlanSupabaseRow> | undefined): Partial<TPlan> {
  return {
    active: planSupabase?.ativo ?? false,
    createdAt: planSupabase?.data_criacao ? new Date(planSupabase?.data_criacao) : undefined,
    endDate: planSupabase?.data_fim ? new Date(planSupabase?.data_fim) : undefined,
    description: planSupabase?.descricao,
    planId: planSupabase?.id_plano,
    periodicy: planSupabase?.periodicidade,
    maxUsers: planSupabase?.qtd_max_usuarios,
    title: planSupabase?.titulo,
    value: planSupabase?.valor_plano
  };
}
