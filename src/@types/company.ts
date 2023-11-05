import { TAdress } from "./adress";
import { Database } from "./database.types";
import { TPhone } from "./phone";
import { TSubscription, TSubscriptionRow } from "./subscription";

type CompanySupabase = Database["public"]["Tables"]["empresa"];

export type TCompanySupabaseInsert = CompanySupabase["Insert"];
export type TCompanySupabaseRow = CompanySupabase["Row"] & {
  assinatura?: Partial<TSubscriptionRow>[]
};

export type TCompany = {
  fantasyName: string;
  companyName: string;
  subscriptions?: Partial<TSubscription>[]
  cnpj: string;
  openAt: string;
  email: string;
  adress: TAdress;
  phone: TPhone;
}

export type TPartialCompany = Partial<Omit<TCompany, "adress" | "phone">> & {
  adress: Partial<TAdress>
  phone: Partial<TPhone>
}
