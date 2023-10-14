import { TAdress } from "./adress";
import { Database } from "./database.types";
import { TPhone } from "./phone";

type CompanySupabase = Database["public"]["Tables"]["empresa"];

export type TCompanySupabaseInsert = CompanySupabase["Insert"];
export type TCompanySupabaseRow = CompanySupabase["Row"];

export type TCompany = {
  fantasyName: string;
  companyName: string;
  cnpj: string;
  openAt: string;
  email: string;
  adress: TAdress;
  phone: TPhone;
}
