import { Database } from "./database.types";
import { TJobRole, TJobRoleSupabaseRow } from "./job-role";
import { EUserType } from "./profile";

type UserCompanySupabase = Database["public"]["Tables"]["usuario_empresa"];

export type TUserCompanyInsert = UserCompanySupabase["Insert"] & {
  cargo?: TJobRoleSupabaseRow
};
export type TuserCompanyRow = UserCompanySupabase["Row"] & {
  cargo: TJobRoleSupabaseRow
}

export type TCompanyUser = {
  userId: number,
  companyId: string,
  email: string,
  firstname: string,
  lastname: string,
  jobRole: TJobRole,
  isAuthorized: boolean,
  type: EUserType,
}
