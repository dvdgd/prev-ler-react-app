import { TCompany } from "../../../@types/company";
import { supabaseClient } from "../../../config/supabase";
import { CompanyToSupabase } from "../../mappers/CompanySupabaseMappers";

export async function NewCompany(company: TCompany): Promise<TCompany | undefined> {
  const companySupabase = CompanyToSupabase(company);

  await supabaseClient.from("empresa").insert(companySupabase);
  await supabaseClient.from("profiles").upsert({
    id_empresa: company.cnpj.replace(/[^0-9]/g, '')
  });

  return company;
}
