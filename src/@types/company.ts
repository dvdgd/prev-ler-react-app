import { TAdress } from "./adress";
import { TPhone } from "./phone";

export type TCompanySupabase = {
  id_cnpj: string;
  created_at?: string;
  nome_fantasia: string;
  razao_social: string;
  cep: string;
  data_abertura: string;
  ddd: number;
  telefone: string;
  email: string;
  municipio: string;
  uf: string;
};

export type TCompany = {
  fantasyName: string;
  companyName: string;
  cnpj: string;
  openAt: string;
  email: string;
  adress: TAdress;
  phone: TPhone;
}
