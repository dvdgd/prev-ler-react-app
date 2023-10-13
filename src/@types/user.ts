import { Session as SupabaseSession } from "@supabase/supabase-js";
import { TCompany } from "./company";
import { TUserProfile } from "./profile";

export type TUser = {
  id: string;
  email: string;
  profile: TUserProfile;
  company?: TCompany;
}

export type TUserSession = {
  user: TUser | undefined;
  session: SupabaseSession | undefined;
}
