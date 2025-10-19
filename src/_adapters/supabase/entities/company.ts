import { Database } from "./database.types";
import { TUserProfileSupabaseRow } from "./profile";
import { TSubscriptionRow } from "./subscription";

type CompanySupabase = Database["public"]["Tables"]["empresa"];

export type TCompanySupabaseInsert = CompanySupabase["Insert"];
export type TCompanySupabaseRow = CompanySupabase["Row"] & {
  assinatura?: Partial<TSubscriptionRow>[],
  profiles?: Partial<TUserProfileSupabaseRow>[]
};
