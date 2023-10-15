import { TCompany } from "../../../@types/company";
import { supabaseClient } from "../../../config/supabase";
import { BaseError } from "../../errors/BaseError";
import { CompanyToSupabase } from "../../mappers/CompanySupabaseMappers";

export async function NewCompany(company: TCompany, userId: string): Promise<TCompany> {
  const companySupabase = CompanyToSupabase(company);

  const { data: companyAlreadyExists, error: companyAlreadyExistsError } =
    await supabaseClient
      .from("empresa")
      .select("id_cnpj")
      .eq("id_cnpj", companySupabase.id_cnpj);

  if (companyAlreadyExists || companyAlreadyExistsError) {
    throw new BaseError({
      title: "Empresa já existente",
      description: "Desculpe, mas essa empresa já existe em nosso sistema.",
    });
  }

  const { error: companyInsertError } = await supabaseClient.from("empresa").insert(companySupabase);
  if (companyInsertError) {
    throw new BaseError({
      title: "Falha inexperada ao cadastrar",
      description: "Desculpe, mas uma falha inexperada ocorreu ao inserir a empresa em nosso sistema.",
    });
  }

  const { error: profileUpdateError } = await supabaseClient
    .from("profiles")
    .update({ id_empresa: companySupabase.id_cnpj })
    .eq("id_usuario", userId);

  if (profileUpdateError) {
    throw new BaseError({
      title: "Erro ao atualizar informações do usuario",
      description: "Caso o erro persista, entre em contato com os administradores do sistema.",
    });
  }

  return company;
}
