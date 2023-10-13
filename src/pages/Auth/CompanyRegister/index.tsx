import { Box, Button, FormControl, FormLabel, HStack, Input, Stack } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";
import { OnboardingLayout } from "../../../shared/components/OnboardingLayout";
import { CheckCompanyComplete } from "../../../shared/functions/CheckCompanyComplete";
import { FormCard } from "../components/FormCard";
import { useCompanyForm } from "./hooks/useCompanyForm";
import { useGetCompanyApi } from "./hooks/useGetCompanyApi";

export function CompanyRegister() {
  const {
    isLoading,
    register,
    handleSubmit,
    setValue,
    getValues,
    handleNewCompany,
  } = useCompanyForm();
  const { getCompanyByCnpjApi } = useGetCompanyApi({ setValue, getValues });

  const { userSession } = useAuth();
  const registerComplete = CheckCompanyComplete(userSession?.user);
  if (registerComplete) {
    return (
      <Navigate to="/auth/company/dashboard" />
    );
  }

  return (
    <OnboardingLayout>
      <form onSubmit={handleSubmit(handleNewCompany)}>
        <FormCard
          title="Estamos quase lá..."
          subtitle="Agora vamos cadastrar sua empresa!"
          spacing={4}
        >
          <HStack>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="cnpj" >CNPJ</FormLabel>
                <Input id="cnpj" {...register("cnpj", { required: true, onChange: getCompanyByCnpjApi })} />
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
              <Input id="ddd" {...register("phone.ddd")} />
            </FormControl>
            <FormControl isRequired flex={1}>
              <FormLabel htmlFor="phoneNumber">Telefone</FormLabel>
              <Input id="phoneNumber" {...register("phone.number")} />
            </FormControl>
          </HStack>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email Institucional</FormLabel>
            <Input id="email" {...register("email")} />
          </FormControl>
          <HStack>
            <FormControl isRequired flex={0.7}>
              <FormLabel htmlFor="cep">CEP</FormLabel>
              <Input id="cep" {...register("adress.cep")} maxLength={10} />
            </FormControl>
            <FormControl isRequired flex={0.4}>
              <FormLabel htmlFor="uf">UF</FormLabel>
              <Input id="uf" {...register("adress.uf")} maxLength={2} />
            </FormControl>
            <FormControl isRequired flex={1}>
              <FormLabel htmlFor="city">Municipio</FormLabel>
              <Input id="city" {...register("adress.city")} />
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
      </form>
    </OnboardingLayout>
  )
}
