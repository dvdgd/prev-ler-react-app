import { Database } from "./database.types";

type TJobRoleSupabase = Database['public']['Tables']['cargo']

export type TJobRoleSupabaseInsert = TJobRoleSupabase['Insert'];
export type TJobRoleSupabaseRow = TJobRoleSupabase['Row'];
