import { BrDateStringToDateInstance } from "@shared/mappers/DatePtBrMapper";
import { UseFormGetValues, UseFormResetField, UseFormSetValue } from "react-hook-form";
import { TCompanyCreateForm } from "./useCompanyForm";

interface IUseGetCompanyApi {
  setValue: UseFormSetValue<TCompanyCreateForm>;
  getValues: UseFormGetValues<TCompanyCreateForm>;
  resetField: UseFormResetField<TCompanyCreateForm>;
}

type TGetCompanyByCnpjHttp = {
  "NOME FANTASIA": string;
  "RAZAO SOCIAL": string;
  "CNPJ": string;
  "STATUS": string;
  "CNAE PRINCIPAL DESCRICAO": string;
  "CNAE PRINCIPAL CODIGO": string;
  "CEP": string;
  "DATA ABERTURA": string;
  "DDD": string;
  "TELEFONE": string;
  "EMAIL": string;
  "TIPO LOGRADOURO": string;
  "LOGRADOURO": string;
  "NUMERO": string;
  "COMPLEMENTO": string;
  "BAIRRO": string;
  "MUNICIPIO": string;
  "UF": string;
}

export const useGetCompanyApi = ({
  setValue,
  getValues,
  resetField
}: IUseGetCompanyApi) => {
  const verifyCnpj = () => {
    const { cnpj } = getValues();
    const cnpjNumber = cnpj.replace(/[^0-9]/g, '');
    return {
      cnpjNumber,
      isLenghtCorrect: cnpjNumber.length === 14
    }
  }

  const getCompanyByCnpjApi = async () => {
    const { cnpjNumber, isLenghtCorrect } = verifyCnpj();
    if (!isLenghtCorrect) return;

    const result = await fetch(
      `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjNumber}`
    );

    const companyAttributesHttp = await result.json() as TGetCompanyByCnpjHttp;
    if (!companyAttributesHttp) return;

    const openAtText = companyAttributesHttp["DATA ABERTURA"];
    const openAt = BrDateStringToDateInstance(openAtText);
    if (openAt)
      isNaN(openAt.getMilliseconds())
        ? resetField('openAt')
        : setValue("openAt", openAt);

    setValue("address.cep", companyAttributesHttp.CEP);
    setValue("address.city", companyAttributesHttp.MUNICIPIO);
    setValue("address.uf", companyAttributesHttp.UF);
    setValue("phone.ddd", companyAttributesHttp.DDD.padStart(3, '0'));
    setValue("phone.number", companyAttributesHttp.TELEFONE);
    setValue("companyName", companyAttributesHttp["RAZAO SOCIAL"]);
    setValue("fantasyName", companyAttributesHttp["NOME FANTASIA"]);
    setValue("email", companyAttributesHttp.EMAIL);
  }

  return {
    getCompanyByCnpjApi
  }
}
