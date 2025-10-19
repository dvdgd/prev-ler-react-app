import { TJobRole } from "@core/entities/job-role";
import { TJobRoleSupabaseInsert } from "@adapters/supabase/entities/job-role";

export function JobRoleToSupabase(jobRole: TJobRole): TJobRoleSupabaseInsert {
  return {
    id_cargo: jobRole.jobRoleId || undefined,
    id_empresa: jobRole.companyId.toString(),
    nome: jobRole.jobName
  };
}

export function JobRoleFromSupabase(jobRoleSupabaseInsert: TJobRoleSupabaseInsert): TJobRole {
  return {
    jobRoleId: jobRoleSupabaseInsert.id_cargo || undefined,
    companyId: jobRoleSupabaseInsert.id_empresa || "0",
    jobName: jobRoleSupabaseInsert.nome
  };
}
