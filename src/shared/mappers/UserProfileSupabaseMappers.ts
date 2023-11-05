import { EUserType, TUserProfile, TUserProfileSupabaseInsert, TUserProfileSupabaseRow } from "../../@types/profile";

export function UserProfileToSupabase(userProfile: Partial<TUserProfile>): TUserProfileSupabaseInsert {
  return {
    first_name: userProfile.firstName,
    last_name: userProfile.lastName,
    id_tipo_usuario: userProfile.userType,
    id_empresa: userProfile.idCompany,
  }
}

export function UserProfileFromSupabase(userProfileSupabase: TUserProfileSupabaseRow): TUserProfile {
  return {
    firstName: userProfileSupabase.first_name,
    lastName: userProfileSupabase.last_name,
    userType: userProfileSupabase.id_tipo_usuario as EUserType,
    idCompany: userProfileSupabase.id_empresa,
    jobRole: userProfileSupabase.cargo?.nome
  }
}
