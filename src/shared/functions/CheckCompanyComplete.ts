import { EUserType } from "../../@types/profile";
import { TUser } from "../../@types/user";

export function CheckCompanyComplete(user: TUser | undefined): boolean {
  const isRepresentante = user?.profile?.userType === EUserType.representante;
  const cnpjExists = !!user?.company?.cnpj;

  if (isRepresentante && cnpjExists) return true;

  return false;
}
