import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { TCompany } from "../../../../@types/company";
import { TGetCompanyByCnpjHttp } from "../@types";

interface IUseGetCompanyApi {
  setValue: UseFormSetValue<TCompany>;
  getValues: UseFormGetValues<TCompany>
}

export const useGetCompanyApi = ({
  setValue, getValues
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

    setValue("adress.cep", companyAttributesHttp.CEP);
    setValue("adress.city", companyAttributesHttp.MUNICIPIO);
    setValue("adress.uf", companyAttributesHttp.UF);
    setValue("phone.ddd", parseInt(companyAttributesHttp.DDD));
    setValue("phone.number", companyAttributesHttp.TELEFONE);
    setValue("companyName", companyAttributesHttp["RAZAO SOCIAL"]);
    setValue("fantasyName", companyAttributesHttp["NOME FANTASIA"]);
    setValue("openAt", companyAttributesHttp["DATA ABERTURA"]);
    setValue("email", companyAttributesHttp.EMAIL);
  }

  return {
    getCompanyByCnpjApi
  }
}
