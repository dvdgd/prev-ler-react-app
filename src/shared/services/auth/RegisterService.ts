import { TUserProfile, TUserProfileSupabaseInsert } from "../../../@types/profile";
import { TUserSession } from "../../../@types/user";
import { supabaseClient } from "../../../config/supabase";
import { getUserProfile } from "./utils/supabase";

export interface IRegisterUserAttributes {
  email: string;
  password: string;
  profile: TUserProfile;
}

export async function Register({
  email,
  password,
  profile
}: IRegisterUserAttributes): Promise<TUserSession> {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: profile.firstName,
        last_name: profile.lastName,
        id_tipo_usuario: profile.userType,
      } as TUserProfileSupabaseInsert
    }
  });

  if (error || !data.user || !data.session) throw error;
  const userProfile = await getUserProfile();

  return {
    session: data.session,
    user: userProfile
  };
}