import { TPlan } from "@core/entities/plan";
import { BaseError } from "@core/errors/BaseError";
import { IPlanPort } from "@core/ports/plan.port";

export class PlanRepositoryLocal implements IPlanPort {
  private _plans: TPlan[] = [
    {
      planId: 1,
      active: true,
      description: "Plano Básico",
      periodicy: "mensal",
      maxUsers: 5,
      title: "Básico",
      value: 29.99
    },
    {
      planId: 2,
      active: true,
      description: "Plano Intermediário",
      periodicy: "mensal",
      maxUsers: 5,
      title: "Intermediário",
      value: 59.99
    },
    {
      planId: 3,
      active: true,
      description: "Plano Avançado",
      periodicy: "anual",
      maxUsers: 5,
      title: "Avançado",
      value: 599.99
    },
  ];

  async createNewPlan(newPlan: TPlan): Promise<void> {
    this._plans.push(newPlan);
  }

  async deletePlanById(planId: number): Promise<void> {
    const planIndex = this._plans.findIndex(p => p.planId === planId);
    if (planIndex === -1) {
      throw new BaseError({
        title: "Erro interno no servidor.",
        description: "Ocorreu um erro ao excluir o Plano."
      });
    }
    this._plans.splice(planIndex, 1);
  }

  async getAllPlans(): Promise<TPlan[]> {
    return [...this._plans];
  }

  async getPlanById(planId: number): Promise<TPlan> {
    const plan = this._plans.find(p => p.planId === planId)
    if (!plan) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao buscar informações sobre o plano. Por favor tente novamente mais tarde.'
      });
    }

    return plan;
  }

  async setPlanActive(planId: number, active: boolean): Promise<TPlan> {
    const plan = this._plans.find(p => p.planId === planId)
    if (!plan) {
      throw new BaseError({
        title: 'Erro interno no servidor.',
        description: 'Erro ao buscar informações sobre o plano. Por favor tente novamente mais tarde.'
      });
    }
    
    plan.active = active;
    return plan;
  }
}
