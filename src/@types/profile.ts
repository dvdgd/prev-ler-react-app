import { Database } from "./database.types";


export enum EUserType {
  representante = "representante",
  funcionario = "funcionario",
  profissional_saude = "profissional_saude",
  administrador = "administrador"
}

type ProfileSupabase = Database["public"]["Tables"]["profiles"]
export type EProfileType = Database["public"]["Enums"]["tipo_usuario"]
export type TUserProfileSupabaseInsert = ProfileSupabase["Insert"]
export type TUserProfileSupabaseRow = ProfileSupabase["Row"]
export type TUserProfileSupabaseUpdate = ProfileSupabase["Update"]

export type TUserProfile = {
  firstName: string;
  lastName: string;
  userType: EUserType;
}


