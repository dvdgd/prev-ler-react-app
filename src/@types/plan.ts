import { Database } from "./database.types";

type PlanSupabase = Database['public']['Tables']['plano'];

export type TPlanSupabaseInsert = PlanSupabase['Insert']
export type TPlanSupabaseRow = PlanSupabase['Row']

export type TPlan = {
  planId?: number;
  createdAt?: Date;
  endDate?: Date;
  active: boolean;
  description: string;
  periodicy: string;
  maxUsers: number;
  title: string;
  value: number;
}
