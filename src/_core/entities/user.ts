import { TCompany } from "./company";
import { TUserProfile } from "./profile";
import { Session as SupabaseSession } from "@supabase/supabase-js";

export type TUser = {
  id: string;
  email: string;
  profile?: TUserProfile;
  company?: TCompany;
}

export type TUserSession = {
  user: TUser | undefined;
  session: SupabaseSession | undefined;
}

export type TSignUpBody = {
  email: string;
  password: string;
  profile: TUserProfile;
}

export type TLoginBody = {
  email: string;
  password: string;
}
