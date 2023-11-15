import { TCompany, TCompanySupabaseRow } from "../../@types/company";
import { EUserType, TUserProfile, TUserProfileSupabaseRow } from "../../@types/profile";
import { ESubscriptionStatus } from "../../@types/subscription";
import { TUser, TUserSession } from "../../@types/user";
import { supabaseClient } from "../../config/supabase";
import { BaseError } from "../errors/BaseError";
import { CompanyFromSupabase } from "../mappers/CompanySupabaseMappers";
import { UserProfileFromSupabase, UserProfileToSupabase } from "../mappers/UserProfileSupabaseMappers";

export class UserService {
  async getUserSession(): Promise<TUserSession | undefined> {
    const userProfile = await this.getUserProfile();
    if (!userProfile) return;

    const { data } = await supabaseClient.auth.getSession();
    if (!data.session) return;

    return {
      session: data.session,
      user: userProfile
    }
  }

  async getUserProfile(): Promise<TUser | undefined> {
    const [user, profile] = await Promise.all([
      this.getUser(),
      this.getProfile(),
    ]);

    if (!user || !profile) return;
    const company = await this.getUserCompany(profile.userType, profile.idCompany || '');

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
      .select(`*, cargo(nome)`)
      .single();
    if (!data || error) return;
    return UserProfileFromSupabase(data as TUserProfileSupabaseRow);
  }

  private async getUserCompany(userType: EUserType, companyId: string): Promise<TCompany | undefined> {
    if (userType !== EUserType.representante) return;
    const { data, error } = await supabaseClient.from("empresa")
      .select(`*, assinatura(*, plano(*))`)
      .is("assinatura.data_fim", null)
      .eq("id_cnpj", companyId)
      .in("assinatura.status_assinatura", [ESubscriptionStatus.active, ESubscriptionStatus.notPaid])
      .limit(1)
      .single();

    if (!data || error) return;
    return CompanyFromSupabase(data as TCompanySupabaseRow);
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
