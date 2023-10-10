import { EUserType, TUserProfile } from "../@types/profile";
import { TUser } from "../@types/user";
import { supabaseClient } from "../config/supabase";

type TUserProfileSupabase = {
  id_usuario?: string;
  first_name: string,
  last_name: string,
  id_tipo_usuario: EUserType;
}

async function getUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (!data || error) {
    return;
  }

  return data.user;
}

async function getProfile() {
  const { data, error } = await supabaseClient.from('profiles').select().limit(1).single();
  if (!data || error) {
    return;
  }
  return data as TUserProfileSupabase;
}

export async function getUserProfile(): Promise<TUser | undefined> {
  const user = await getUser();
  if (!user) {
    return;
  }

  const profile = await getProfile();
  if (!profile) {
    return;
  }

  return {
    email: user.email || "",
    id: user.id,
    profile: {
      firstName: profile.first_name,
      lastName: profile.last_name,
      userType: profile.id_tipo_usuario,
    }
  }
}

interface IRegisterUserAttributes {
  email: string;
  password: string;
  profile: TUserProfile;
}

export async function registerUser({ email, password, profile }: IRegisterUserAttributes) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: profile.firstName,
        last_name: profile.lastName,
        id_tipo_usuario: profile.userType,
      } as TUserProfileSupabase
    }
  });
  if (error || !data.user) throw error;

  const userProfile = await getUserProfile();
  return userProfile;
}

interface ILoginAttributes {
  email: string;
  password: string;
}

export async function login(loginAttributes: ILoginAttributes) {
  const { data, error } = await supabaseClient.auth.signInWithPassword(loginAttributes);
  if (error || !data.user) throw error;

  const userProfile = await getUserProfile();
  return userProfile;
}
