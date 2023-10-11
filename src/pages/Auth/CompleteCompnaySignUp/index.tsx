import { Box, Button, FormControl, FormLabel, HStack, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TCompanySupabase } from "../../../@types/company";
import { supabaseClient } from "../../../config/supabase";
import { Layout } from "../../LandingPage/components/Layout";
import { FormCard } from "../components/FormCard";
import { TFormCompanyInput, TGetCompanyByCnpjHttp } from "./@types";

export default function CompleteCompnaySignUp() {
  const { register, handleSubmit, getValues, setValue } = useForm<TFormCompanyInput>();
  const [isLoading, setIsLoading] = useState(false);

  const handleNewCompany: SubmitHandler<TFormCompanyInput> = async (formAttributes) => {
    const companyAttributes = {
      cep: formAttributes.cep,
      municipio: formAttributes.city,
      created_at: formAttributes.cnpj,
      id_cnpj: formAttributes.companyName,
      nome_fantasia: formAttributes.fantasyName,
      data_abertura: formAttributes.openAt,
      ddd: formAttributes.ddd,
      email: formAttributes.email,
      razao_social: formAttributes.mail,
      telefone: formAttributes.phoneNumber,
      uf: formAttributes.uf,
    } as TCompanySupabase;

    try {
      setIsLoading(true);
      console.log("Saving company...", companyAttributes);
      await supabaseClient.from("empresa").insert(companyAttributes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const verifyCnpj = () => {
    const { cnpj } = getValues();
    const cnpjNumber = cnpj.replace(/[^0-9]/g, '');
    return {
      cnpjNumber,
      isLenghtCorrect: cnpjNumber.length === 14
    }
  }

  const getCompanyByCnpjHttp = async () => {
    const { cnpjNumber, isLenghtCorrect } = verifyCnpj();
    if (!isLenghtCorrect) return;

    const result = await fetch(
      `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjNumber}`
    );

    const companyAttributesHttp = await result.json() as TGetCompanyByCnpjHttp;
    if (!companyAttributesHttp) return;

    setValue("cep", companyAttributesHttp.CEP);
    setValue("city", companyAttributesHttp.MUNICIPIO);
    setValue("companyName", companyAttributesHttp["RAZAO SOCIAL"]);
    setValue("fantasyName", companyAttributesHttp["NOME FANTASIA"]);
    setValue("openAt", companyAttributesHttp["DATA ABERTURA"]);
    setValue("ddd", parseInt(companyAttributesHttp.DDD));
    setValue("phoneNumber", companyAttributesHttp.TELEFONE);
    setValue("email", companyAttributesHttp.EMAIL);
    setValue("uf", companyAttributesHttp.UF);
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(handleNewCompany)}></form>
      <FormCard
        title="Estamos quase lá..."
        subtitle="Agora vamos cadastrar sua empresa!"
        spacing={4}
      >
        <HStack>
          <Box>
            <FormControl isRequired>
              <FormLabel htmlFor="cnpj" >CNPJ</FormLabel>
              <Input id="cnpj" {...register("cnpj", { required: true, onChange: getCompanyByCnpjHttp })} />
            </FormControl>
          </Box>
          <Box>
            <FormControl isRequired>
              <FormLabel htmlFor="fantasyName" >Nome Fantasia</FormLabel>
              <Input id="fantasyName" {...register("fantasyName", { required: true })} />
            </FormControl>
          </Box>
        </HStack>
        <FormControl isRequired>
          <FormLabel htmlFor="companyName">Razão Social</FormLabel>
          <Input id="companyName" {...register("companyName")} />
        </FormControl>
        <FormControl isRequired flex={0.5}>
          <FormLabel htmlFor="openAt">Data de abertura</FormLabel>
          <Input id="openAt" {...register("openAt")} />
        </FormControl>
        <HStack>
          <FormControl isRequired flex={0.3}>
            <FormLabel htmlFor="ddd">DDD</FormLabel>
            <Input id="ddd" {...register("ddd")} />
          </FormControl>
          <FormControl isRequired flex={1}>
            <FormLabel htmlFor="phoneNumber">Telefone</FormLabel>
            <Input id="phoneNumber" {...register("phoneNumber")} />
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email Institucional</FormLabel>
          <Input id="email" {...register("email")} />
        </FormControl>
        <HStack>
          <FormControl isRequired flex={0.7}>
            <FormLabel htmlFor="cep">CEP</FormLabel>
            <Input id="cep" {...register("cep")} maxLength={10} />
          </FormControl>
          <FormControl isRequired flex={0.4}>
            <FormLabel htmlFor="uf">UF</FormLabel>
            <Input id="uf" {...register("uf")} maxLength={2} />
          </FormControl>
          <FormControl isRequired flex={1}>
            <FormLabel htmlFor="city">Municipio</FormLabel>
            <Input id="city" {...register("city")} />
          </FormControl>

        </HStack>
        <Stack spacing={10} pt={2}>
          <Button
            loadingText="Submitting"
            colorScheme='brand'
            size="lg"
            type="submit"
            isLoading={isLoading}
          >
            Cadastrar
          </Button>
        </Stack>
      </FormCard>
    </Layout>
  )
}
