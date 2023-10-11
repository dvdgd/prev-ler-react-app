export enum EUserType {
  representante = "representante",
  funcionario = "funcionario",
  profissional_saude = "profissional_saude",
  administrador = "administrador"
}

export type TUserProfile = {
  firstName: string;
  lastName: string;
  userType: EUserType;
}

export type TUserProfileSupabase = {
  id_usuario?: string;
  first_name: string,
  last_name: string,
  id_tipo_usuario: EUserType;
}
