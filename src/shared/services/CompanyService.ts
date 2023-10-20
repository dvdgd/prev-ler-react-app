import { TCompany } from "../../@types/company";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { CompanyToSupabase } from "../mappers/CompanySupabaseMappers";
import { UserService } from "./UserService";

export class CompanyService {
  constructor(private userService = new UserService()) { }

  async create(company: TCompany, userId: string): Promise<TCompany> {
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
}
