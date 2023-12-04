import { TAddress } from "./address";
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
  address: TAddress;
  phone: TPhone;
}

export type TPartialCompany = Partial<Omit<TCompany, "address" | "phone">> & {
  address: Partial<TAddress>
  phone: Partial<TPhone>
}
