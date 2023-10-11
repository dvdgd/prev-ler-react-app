import { TCompany } from "./company";
import { TUserProfile } from "./profile";

export type TUser = {
  id: string;
  email: string;
  profile: TUserProfile;
  company?: TCompany;
}
