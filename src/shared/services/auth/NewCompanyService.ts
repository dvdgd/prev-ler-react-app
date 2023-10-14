import { TCompany } from "../../../@types/company";
import { supabaseClient } from "../../../config/supabase";
import { CompanyToSupabase } from "../../mappers/CompanySupabaseMappers";

export async function NewCompany(company: TCompany): Promise<TCompany | undefined> {
  const companySupabase = CompanyToSupabase(company);

  await supabaseClient.from("empresa").insert(companySupabase);
  await supabaseClient.from("profiles").update({
    id_empresa: companySupabase.id_cnpj
  });

  return company;
}
