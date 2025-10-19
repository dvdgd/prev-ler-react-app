import { EUserType } from "@core/entities/profile";
import { TUser } from "@core/entities/user";

export function ReturnTrueIfCompanyComplete(user: TUser | undefined): boolean {
  const isRepresentante = user?.profile?.userType === EUserType.representante;
  const cnpjExists = !!user?.company?.cnpj;

  if (isRepresentante && cnpjExists) return true;

  return false;
}
