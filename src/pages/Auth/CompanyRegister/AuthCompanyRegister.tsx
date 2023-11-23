import { Button, Divider, FormControl, FormLabel, Input, Select, SimpleGrid, Stack } from "@chakra-ui/react";
import { FormCard } from "@shared/components/Card/FormCard";
import { ReturnTrueIfCompanyComplete } from "@shared/functions/ReturnTrueIfCompanyComplete";
import { Controller } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";
import { usePlans } from "../../../hooks/usePlans";
import { OnboardingLayout } from "../../../layouts/UserOnboardingLayout/UserOnboardingLayout";
import { useCompanyForm } from "./hooks/useCompanyForm";
import { useGetCompanyApi } from "./hooks/useGetCompanyApi";

export function AuthCompanyRegister() {
  const {
    isLoading,
    register,
    handleSubmit,
    setValue,
    getValues,
    handleNewCompany,
    control
  } = useCompanyForm();

  const { getCompanyByCnpjApi } = useGetCompanyApi({ setValue, getValues });

  const { allPlans } = usePlans();
  const plans = allPlans ?? [];

  const { userSession } = useAuth();
  const registerComplete = ReturnTrueIfCompanyComplete(userSession?.user);
  if (registerComplete) {
    return (
      <Navigate to="/auth/company/dashboard" />
    );
  }

  return (
    <OnboardingLayout>
      <form onSubmit={handleSubmit(handleNewCompany)}>
        <FormCard
          title="Cadastrar Empresa"
          spacing={4}
        >
          <SimpleGrid w="full" columns={[1, 2]} spacingX={4} spacingY={8}>
            <FormControl isRequired>
              <FormLabel htmlFor="cnpj" >CNPJ</FormLabel>
              <Input id="cnpj" {...register("cnpj", { required: true, onChange: getCompanyByCnpjApi })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="fantasyName" >Nome Fantasia</FormLabel>
              <Input id="fantasyName" {...register("fantasyName", { required: true })} />
            </FormControl>
          </SimpleGrid>
          <FormControl isRequired>
            <FormLabel htmlFor="companyName">Razão Social</FormLabel>
            <Input id="companyName" {...register("companyName")} />
          </FormControl>
          <FormControl isRequired flex={0.5}>
            <FormLabel htmlFor="openAt">Data de abertura</FormLabel>
            <Input id="openAt" {...register("openAt")} />
          </FormControl>
          <SimpleGrid w="full" columns={[1, 2]} spacingX={4} spacingY={8}>
            <FormControl isRequired flex={0.3}>
              <FormLabel htmlFor="ddd">DDD</FormLabel>
              <Input id="ddd" {...register("phone.ddd")} />
            </FormControl>
            <FormControl isRequired flex={1}>
              <FormLabel htmlFor="phoneNumber">Telefone</FormLabel>
              <Input id="phoneNumber" {...register("phone.number")} />
            </FormControl>
          </SimpleGrid>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email Institucional</FormLabel>
            <Input id="email" {...register("email")} />
          </FormControl>

          <SimpleGrid w="full" columns={[1, 1, 3]} spacingX={4} spacingY={8}>
            <FormControl isRequired >
              <FormLabel htmlFor="cep">CEP</FormLabel>
              <Input id="cep" {...register("address.cep")} maxLength={10} />
            </FormControl>
            <FormControl isRequired >
              <FormLabel htmlFor="uf">UF</FormLabel>
              <Input id="uf" {...register("address.uf")} maxLength={2} />
            </FormControl>
            <FormControl isRequired >
              <FormLabel htmlFor="city">Municipio</FormLabel>
              <Input id="city" {...register("address.city")} />
            </FormControl>
          </SimpleGrid>
          <Divider />

          <FormControl isRequired>
            <FormLabel>Plano</FormLabel>
            <Controller
              name="planId"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Selecione">
                  {plans.map((plan) => {
                    const periodicyText = plan.periodicy === "mensais" ? "mês" : "ano";
                    return (
                      <option key={plan.planId} value={plan.planId}>
                        {plan.title}, R${plan.value}/{periodicyText}, {plan.maxUsers} usuários
                      </option>
                    );
                  })}
                </Select>
              )}
            />
          </FormControl>

          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Aguarde..."
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
