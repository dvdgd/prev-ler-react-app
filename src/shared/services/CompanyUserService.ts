import { TCompanyUser, TuserCompanyRow } from "../../@types/company-user";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { UserCompanyFromSupabase, UserCompanyToSupabase } from "../mappers/CompanyUserSupabaseMapper";

export class CompanyUserService {
  async getCompanyUsers(): Promise<TCompanyUser[]> {
    const { data, error } = await supabaseClient
      .from("usuario_empresa")
      .select("*, cargo(*)");

    if (!data || error) {
      throw new BaseError({
        title: "Erro ao recuperar os usuários da empresa.",
        description: "Por favor, tente novamente mais tarde.",
      });
    }

    const companyUsers = data.map((user) =>
      UserCompanyFromSupabase(user as TuserCompanyRow)
    );
    return companyUsers;
  }

  async getUserById(userId: number): Promise<TCompanyUser> {
    const { data, error } = await supabaseClient
      .from("usuario_empresa")
      .select("*, cargo(*)")
      .eq("id_usuario", userId)
      .single();

    if (!data || error) {
      throw new BaseError({
        title: "Erro ao recuperar os usuários da empresa.",
        description: "Por favor, tente novamente mais tarde.",
      });
    }

    return UserCompanyFromSupabase(data as TuserCompanyRow)
  }

  async createOrUpdateUser(companyUser: TCompanyUser): Promise<void> {
    try {
      const companyUserSupabase = UserCompanyToSupabase(companyUser);

      const { error } = await supabaseClient
        .from("usuario_empresa")
        .upsert(companyUserSupabase);

      if (error) {
        throw new BaseError({
          title: "Erro ao salvar dados do usuário",
          description: "Por favor, tente novamente mais tarde.",
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
