import { Database } from "./database.types";
import { TJobRoleSupabaseRow } from "./job-role";

type UserCompanySupabase = Database["public"]["Tables"]["usuario_empresa"];

export type TUserCompanyInsert = UserCompanySupabase["Insert"] & {
  cargo?: TJobRoleSupabaseRow
};
export type TuserCompanyRow = UserCompanySupabase["Row"] & {
  cargo: TJobRoleSupabaseRow
}
