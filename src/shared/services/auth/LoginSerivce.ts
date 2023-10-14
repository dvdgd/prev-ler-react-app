import { TUserSession } from "../../../@types/user";
import { supabaseClient } from "../../../config/supabase";
import { getUserProfile } from "./utils/supabase";

export interface ILoginAttributes {
  email: string;
  password: string;
}

export async function Login(loginAttributes: ILoginAttributes): Promise<TUserSession> {
  const { data, error } = await supabaseClient.auth.signInWithPassword(loginAttributes);
  if (error || !data.user) throw error;

  const userProfile = await getUserProfile();

  return {
    user: userProfile,
    session: data.session,
  };
}
