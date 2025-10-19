import { Database } from "./database.types";

type PlanSupabase = Database['public']['Tables']['plano'];

export type TPlanSupabaseInsert = PlanSupabase['Insert']
export type TPlanSupabaseRow = PlanSupabase['Row']
