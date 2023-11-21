import { TAdress } from "./adress";
import { Database } from "./database.types";
import { TPhone } from "./phone";
import { TUserProfile, TUserProfileSupabaseRow } from "./profile";
import { TSubscription, TSubscriptionRow } from "./subscription";

type CompanySupabase = Database["public"]["Tables"]["empresa"];

export type TCompanySupabaseInsert = CompanySupabase["Insert"];
export type TCompanySupabaseRow = CompanySupabase["Row"] & {
  assinatura?: Partial<TSubscriptionRow>[],
  profiles?: Partial<TUserProfileSupabaseRow>[]
};

export type TCompany = {
  fantasyName: string;
  companyName: string;
  subscriptions?: Partial<TSubscription>[]
  users?: Partial<TUserProfile>[]
  cnpj: string;
  openAt: Date;
  email: string;
  adress: TAdress;
  phone: TPhone;
}

export type TPartialCompany = Partial<Omit<TCompany, "adress" | "phone">> & {
  adress: Partial<TAdress>
  phone: Partial<TPhone>
}
