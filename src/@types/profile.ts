import { Database } from "./database.types";

type ProfileSupabase = Database["public"]["Tables"]["profiles"]

export enum EUserType {
  representante = "representante",
  funcionario = "funcionario",
  profissional_saude = "profissional_saude",
  administrador = "administrador"
}

export type EProfileType = Database["public"]["Enums"]["tipo_usuario"]

export type TUserProfile = {
  firstName: string;
  lastName: string;
  userType: EUserType;
}

export type TUserProfileSupabaseInsert = ProfileSupabase["Insert"]
export type TUserProfileSupabaseRow = ProfileSupabase["Row"]
