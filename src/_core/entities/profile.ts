export enum EUserType {
  representante = "representante",
  funcionario = "funcionario",
  profissional_saude = "profissional_saude",
  administrador = "administrador"
}

export type TUserProfile = {
  userId?: string;
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  userType: EUserType;
  idCompany?: string | null;
  jobRole?: string;
  createdAt?: Date;
}
