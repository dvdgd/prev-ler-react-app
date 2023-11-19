import { supabaseClient } from "@config/supabase";
import { BaseError } from "@shared/errors/BaseError";
import { JobRoleFromSupabase, JobRoleToSupabase } from "@shared/mappers/JobRoleSupabaseMapper";
import { TJobRole } from "types/job-role";

export class JobRoleService {

  async getAllJobsRoles(): Promise<TJobRole[]> {
    const { data, error } = await supabaseClient
      .from("cargo")
      .select("*");

    if (!data || error) {
      throw new BaseError({
        title: "Ops, ocorreu um erro inesperado.",
        description: "Desculpe, não foi possível recuperar as informações de cargo."
      });
    }

    return data.map((jr) => JobRoleFromSupabase(jr));
  }

  async createOrUpdate(jobRole: TJobRole): Promise<void> {
    const jobRoleSupabase = JobRoleToSupabase(jobRole);
    const { error } = await supabaseClient
      .from("cargo")
      .upsert(jobRoleSupabase);

    if (error) {
      throw new BaseError({
        title: "Ops, ocorreu um erro inesperado.",
        description: "Desculpe, não foi salvar as informações de cargo."
      });
    }
  }
}
