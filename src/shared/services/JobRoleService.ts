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

  async getJobRoleById(jobRoleId: number): Promise<TJobRole> {
    const { data, error } = await supabaseClient
      .from("cargo")
      .select("*")
      .eq("id_cargo", jobRoleId)
      .single();

    if (!data || error) {
      throw new BaseError({
        title: "Ops, ocorreu um erro inesperado.",
        description: "Desculpe, não foi possível recuperar as informações de cargo."
      });
    }

    return JobRoleFromSupabase(data);
  }

  async deleteJobroleById(jobRoleId: number): Promise<void> {
    const { error } = await supabaseClient
      .from("cargo")
      .delete()
      .eq("id_cargo", jobRoleId);

    if (error?.code === '23503') {
      throw new BaseError({
        title: "Desculpe, não é possível excluir o cargo.",
        description: "O cargo está sendo usado por outras entidades do sistema, para excluí-lo é necessário exlcuir essas entidades antes."
      });
    } else if (error) {
      throw new BaseError({
        title: "Ops, ocorreu um erro inesperado.",
        description: "Não foi possível excluir o cargo, por favor tente novamente mais tarde."
      });
    }
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
