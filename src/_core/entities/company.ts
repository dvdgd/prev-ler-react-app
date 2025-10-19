import { TAddress } from "./address";
import { TPhone } from "./phone";
import { TUserProfile } from "./profile";
import { TSubscription } from "./subscription";

export type TCompany = {
  fantasyName: string;
  companyName: string;
  subscriptions?: Partial<TSubscription>[]
  users?: Partial<TUserProfile>[]
  cnpj: string;
  openAt: Date;
  email: string;
  address: TAddress;
  phone: TPhone;
}

export type TPartialCompany = Partial<Omit<TCompany, "address" | "phone">> & {
  address: Partial<TAddress>
  phone: Partial<TPhone>
}
