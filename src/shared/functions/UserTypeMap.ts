import { EUserType } from "../../@types/profile";

const userTypeMap = {
  [EUserType.administrador]: "Administrador",
  [EUserType.funcionario]: "Funcionário",
  [EUserType.profissional_saude]: "Profissional de Saúde",
  [EUserType.representante]: "Representante",
}

export function getUserTypeText(type: EUserType) {
  return userTypeMap[type];
}
