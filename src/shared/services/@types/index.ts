import { TUserProfile } from "../../../@types/profile";

export type TSignUpBody = {
  email: string;
  password: string;
  cpf: string;
  profile: TUserProfile;
}

export type TLoginBody = {
  email: string;
  password: string;
}
