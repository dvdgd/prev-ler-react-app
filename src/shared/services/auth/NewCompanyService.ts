import { TCompany } from "../../../@types/company";
import { supabaseClient } from "../../../config/supabase";
import { CompanyToSupabase } from "../../mappers/CompanySupabaseMappers";

export async function NewCompany(company: TCompany, userId: string): Promise<TCompany> {
  const companySupabase = CompanyToSupabase(company);

  await supabaseClient.from("empresa").insert(companySupabase);
  await supabaseClient.from("profiles").update({
    id_empresa: companySupabase.id_cnpj
  }).eq("id_usuario", userId);

  return company;
}
