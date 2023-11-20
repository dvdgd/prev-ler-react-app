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

  async deleteCompanyUser(userId: number): Promise<void> {
    const { error } = await supabaseClient
      .from("usuario_empresa")
      .delete()
      .eq("id_usuario", userId);

    if (error?.code === '23503') {
      throw new BaseError({
        title: "Desculpe, não é possível excluir o usuário.",
        description: "O usuário está sendo usado por outras entidades do sistema, para excluí-lo é necessário exlcuir essas entidades antes."
      });
    } else if (error) {
      throw new BaseError({
        title: "Ops, um erro inesperado aconteceu.",
        description: "Não foi possível excluir o usuário."
      });
    }
  }

  async createOrUpdateUser(companyUser: TCompanyUser): Promise<void> {
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
  }
}
