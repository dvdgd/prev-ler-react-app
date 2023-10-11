import { TCompany } from "../@types/company";
import { EUserType, TUserProfile, TUserProfileSupabase } from "../@types/profile";
import { TUser } from "../@types/user";
import { supabaseClient } from "../config/supabase";
import { CompanyFromSupabase } from "../mappers/CompanySupabaseMappers";
import { UserProfileFromSupabase } from "../mappers/UserProfileSupabaseMappers";

async function getUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (!data || error) return;
  return data.user;
}

async function getProfile(): Promise<TUserProfile | undefined> {
  const { data, error } = await supabaseClient.from('profiles').select().limit(1).single();
  if (!data || error) return;
  return UserProfileFromSupabase(data);
}

async function getUserCompany(userType: EUserType): Promise<TCompany | undefined> {
  if (userType !== EUserType.profissional_saude) return;
  const { data, error } = await supabaseClient.from("empresa").select().limit(1).single();
  if (!data || error) return;
  return CompanyFromSupabase(data);
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

  const company = await getUserCompany(profile.userType);

  return {
    email: user.email || "",
    id: user.id,
    profile,
    company
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
