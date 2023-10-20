import { TCompany } from "../../@types/company";
import { EUserType, TUserProfile } from "../../@types/profile";
import { TUser } from "../../@types/user";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { CompanyFromSupabase } from "../mappers/CompanySupabaseMappers";
import { UserProfileFromSupabase, UserProfileToSupabase } from "../mappers/UserProfileSupabaseMappers";

export class UserService {
  async getUserProfile(): Promise<TUser | undefined> {
    const [user, profile] = await Promise.all([
      this.getUser(),
      this.getProfile(),
    ]);

    if (!user || !profile) return;
    const company = await this.getUserCompany(profile.userType);

    return {
      email: user.email || "",
      id: user.id,
      profile,
      company
    }
  }

  private async getUser() {
    const { data, error } = await supabaseClient.auth.getUser();
    if (!data || error) return;
    return data.user;
  }

  private async getProfile(): Promise<TUserProfile | undefined> {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select("*")
      .single();
    if (!data || error) return;
    return UserProfileFromSupabase(data);
  }

  private async getUserCompany(userType: EUserType): Promise<TCompany | undefined> {
    if (userType !== EUserType.representante) return;
    const { data, error } = await supabaseClient.from("empresa")
      .select("*")
      .limit(1)
      .single();

    if (!data || error) return;
    return CompanyFromSupabase(data);
  }

  async updateProfileByUserId(profile: Partial<TUserProfile>, userId: string): Promise<void> {
    const profileSupabase = UserProfileToSupabase(profile);

    const { error: profileUpdateError } = await supabaseClient
      .from("profiles")
      .update(profileSupabase)
      .eq("id_usuario", userId);

    if (profileUpdateError) {
      throw new BaseError({
        title: "Erro ao atualizar informações do usuario",
        description: "Caso o erro persista, entre em contato com os administradores do sistema.",
      });
    }
  }
}
