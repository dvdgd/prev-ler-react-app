import { TPlan } from "@core/entities/plan";

export interface IPlanPort {
  createNewPlan(newPlan: TPlan): Promise<void>;
  deletePlanById(planId: number): Promise<void>;
  getAllPlans(): Promise<TPlan[]>;
  getPlanById(planId: number): Promise<TPlan>;
  setPlanActive(planId: number, active: boolean): Promise<TPlan>;
}
