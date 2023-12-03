import { EUserType, TUserProfile, TUserProfileSupabaseInsert, TUserProfileSupabaseRow } from "../../@types/profile";

export function UserProfileToSupabase(userProfile: Partial<TUserProfile>): TUserProfileSupabaseInsert {
  return {
    first_name: userProfile.firstName ?? "",
    email: userProfile.email,
    last_name: userProfile.lastName ?? "",
    cpf: userProfile.cpf ?? "",
    id_tipo_usuario: userProfile.userType,
    id_empresa: userProfile.idCompany,
  }
}

export function UserProfileFromSupabase(userProfileSupabase: TUserProfileSupabaseRow): TUserProfile {
  return {
    cpf: userProfileSupabase.cpf,
    email: userProfileSupabase.email,
    firstName: userProfileSupabase.first_name,
    lastName: userProfileSupabase.last_name,
    userType: userProfileSupabase.id_tipo_usuario as EUserType,
    idCompany: userProfileSupabase.id_empresa,
    jobRole: userProfileSupabase.cargo?.nome
  }
}

export function PartialUserProfileFromSupabase(userProfileSupabase: Partial<TUserProfileSupabaseRow>): Partial<TUserProfile> {
  return {
    email: userProfileSupabase.email,
    firstName: userProfileSupabase.first_name,
    lastName: userProfileSupabase.last_name,
    cpf: userProfileSupabase.cpf,
    userType: userProfileSupabase.id_tipo_usuario as EUserType,
    idCompany: userProfileSupabase.id_empresa,
    jobRole: userProfileSupabase.cargo?.nome
  }
}
