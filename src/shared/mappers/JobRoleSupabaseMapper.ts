import { TJobRole, TJobRoleSupabaseInsert } from "../../@types/job-role";

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
    companyId: parseInt(jobRoleSupabaseInsert.id_empresa, 10),
    jobName: jobRoleSupabaseInsert.nome
  };
}
