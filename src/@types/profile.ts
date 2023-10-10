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
