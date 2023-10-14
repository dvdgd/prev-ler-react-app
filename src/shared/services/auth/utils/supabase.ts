import { TCompany } from "../../../../@types/company";
import { EUserType, TUserProfile } from "../../../../@types/profile";
import { TUser } from "../../../../@types/user";
import { supabaseClient } from "../../../../config/supabase";
import { CompanyFromSupabase } from "../../../mappers/CompanySupabaseMappers";
import { UserProfileFromSupabase } from "../../../mappers/UserProfileSupabaseMappers";

async function getUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (!data || error) return;
  return data.user;
}

export async function getProfile(): Promise<TUserProfile | undefined> {
  const { data, error } = await supabaseClient.from('profiles').select().limit(1).single();
  if (!data || error) return;
  return UserProfileFromSupabase(data);
}

export async function getUserCompany(userType: EUserType): Promise<TCompany | undefined> {
  if (userType !== EUserType.profissional_saude) return;
  const { data, error } = await supabaseClient.from("empresa").select().limit(1).single();
  if (!data || error) return;
  return CompanyFromSupabase(data);
}

export async function getUserProfile(): Promise<TUser | undefined> {
  const [user, profile] = await Promise.all([
    getUser(),
    getProfile(),
  ]);

  if (!user || !profile) return;
  const company = await getUserCompany(profile.userType);

  return {
    email: user.email || "",
    id: user.id,
    profile,
    company
  }
}
