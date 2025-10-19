import { TJobRole } from "./job-role";
import { EUserType } from "./profile";

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
