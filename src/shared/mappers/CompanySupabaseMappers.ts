import { TCompany, TCompanySupabaseInsert, TCompanySupabaseRow } from "../../@types/company";
import { DateonlyPtBrToISO } from "./DatePtBrMapper";

export function CompanyFromSupabase(company: TCompanySupabaseRow): TCompany {
  return {
    adress: {
      cep: company.cep,
      city: company.municipio,
      uf: company.uf
    },
    phone: {
      number: company.telefone,
      ddd: company.ddd,
    },
    cnpj: company.id_cnpj,
    companyName: company.razao_social,
    fantasyName: company.nome_fantasia,
    email: company.email,
    openAt: company.data_abertura.toString(),
  }
}

export function CompanyToSupabase(company: TCompany): TCompanySupabaseInsert {
  return {
    cep: company.adress.cep,
    municipio: company.adress.city,
    uf: company.adress.uf,
    telefone: company.phone.number,
    ddd: company.phone.ddd,
    id_cnpj: company.cnpj.replace(/\D/g, ''),
    razao_social: company.companyName,
    nome_fantasia: company.fantasyName,
    email: company.email,
    data_abertura: DateonlyPtBrToISO(company.openAt) || "",
  }
}
