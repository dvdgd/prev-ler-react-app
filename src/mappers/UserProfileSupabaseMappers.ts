import { TUserProfile, TUserProfileSupabase } from "../@types/profile";

export function UserProfileToSupabase(userProfile: TUserProfile): TUserProfileSupabase {
  return {
    first_name: userProfile.firstName,
    last_name: userProfile.lastName,
    id_tipo_usuario: userProfile.userType,
  }
}

export function UserProfileFromSupabase(userProfileSupabase: TUserProfileSupabase): TUserProfile {
  return {
    firstName: userProfileSupabase.first_name,
    lastName: userProfileSupabase.last_name,
    userType: userProfileSupabase.id_tipo_usuario,
  }
}
