import { Database } from "./database.types";
import { TJobRoleSupabaseRow } from "./job-role";


export enum EUserType {
  representante = "representante",
  funcionario = "funcionario",
  profissional_saude = "profissional_saude",
  administrador = "administrador"
}

type ProfileSupabase = Database["public"]["Tables"]["profiles"]
export type EProfileType = Database["public"]["Enums"]["tipo_usuario"]
export type TUserProfileSupabaseInsert = ProfileSupabase["Insert"]
export type TUserProfileSupabaseRow = ProfileSupabase["Row"] & {
  cargo: Omit<TJobRoleSupabaseRow, "id_cargo" | "id_empresa">
}
export type TUserProfileSupabaseUpdate = ProfileSupabase["Update"]

export type TUserProfile = {
  email: string;
  firstName: string;
  lastName: string;
  userType: EUserType;
  idCompany?: string | null;
  jobRole?: string;
}
