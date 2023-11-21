import { TCompany, TCompanySupabaseRow } from "../../@types/company";
import { TCompanyUser, TuserCompanyRow } from "../../@types/company-user";
import { EUserType } from "../../@types/profile";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { CompanyFromSupabase, CompanyToSupabase } from "../mappers/CompanySupabaseMappers";
import { UserCompanyFromSupabase } from "../mappers/CompanyUserSupabaseMapper";
import { SubscriptionService } from "./SubscriptionService";
import { UserService } from "./UserService";

export class CompanyService {
  constructor(
    private userService = new UserService(),
    private subscriptionService = new SubscriptionService(),
  ) { }

  async create(company: TCompany, userId: string, planId: number): Promise<TCompany> {
    const companySupabase = CompanyToSupabase(company);

    await this.checkIfCompanyAlreadyExists(companySupabase.id_cnpj);

    const { error: companyInsertError } = await supabaseClient.from("empresa").insert(companySupabase);
    if (companyInsertError) {
      throw new BaseError({
        title: "Falha inexperada ao cadastrar",
        description: "Desculpe, mas uma falha inexperada ocorreu ao inserir a empresa em nosso sistema.",
      });
    }

    await this.userService.updateProfileByUserId({
      idCompany: companySupabase.id_cnpj
    }, userId);

    const subscription = await this.subscriptionService.subscribePlan(companySupabase.id_cnpj, planId);
    Object.assign(company, {
      subscriptions: [subscription]
    });
    return company;
  }

  private async checkIfCompanyAlreadyExists(companyId: string) {
    const { data: companyAlreadyExists } =
      await supabaseClient
        .from("empresa")
        .select("id_cnpj")
        .eq("id_cnpj", companyId)
        .single();

    if (companyAlreadyExists) {
      throw new BaseError({
        title: "Empresa já existente",
        description: "Desculpe, mas essa empresa já existe em nosso sistema.",
      });
    }
  }

  async getAllCompanies(): Promise<TCompany[]> {
    const { data: companies, error } = await supabaseClient
      .from("empresa")
      .select("*, assinatura(*, plano(*)), profiles(*)")
      .eq("profiles.id_tipo_usuario", EUserType.representante);

    if (!companies || error) {
      throw new BaseError({
        title: "Ops, um erro inesperado ocorreu",
        description: "Não foi possível buscar as empresas do sistema.",
      });
    }

    return companies.map((c) => CompanyFromSupabase(c as TCompanySupabaseRow));
  }

  async getCompanyById(companyId: string): Promise<TCompany> {
    const { data: company, error } = await supabaseClient
      .from("empresa")
      .select("*, profiles(*), assinatura(*, plano(*))")
      .eq("profiles.id_tipo_usuario", EUserType.representante)
      .eq("id_cnpj", companyId)
      .order('id_assinatura', { foreignTable: 'assinatura', ascending: false })
      .single();

    if (!company || error) {
      throw new BaseError({
        title: "Ops, um erro inesperado ocorreu",
        description: "Não foi possível buscar as empresas do sistema.",
      });
    }

    return CompanyFromSupabase(company as TCompanySupabaseRow);
  }

  async getCompanyUsers(): Promise<TCompanyUser[]> {
    const { data, error } = await supabaseClient
      .from("usuario_empresa")
      .select("*");

    if (!data || error) {
      throw new BaseError({
        title: "Erro ao recuperar os usuários da empresa.",
        description: "Por favor, tente novamente mais tarde.",
      });
    }

    return data.map((u) => UserCompanyFromSupabase(u as TuserCompanyRow));
  }
}
