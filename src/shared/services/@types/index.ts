import { TUserProfile } from "../../../@types/profile";

export type TSignUpBody = {
  email: string;
  password: string;
  profile: TUserProfile;
}

export type TLoginBody = {
  email: string;
  password: string;
}
