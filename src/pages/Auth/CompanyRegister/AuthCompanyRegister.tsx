import { Button, Divider, FormControl, FormLabel, Input, Select, SimpleGrid, Stack } from "@chakra-ui/react";
import { FormCard } from "@shared/components/Card/FormCard";
import { ReturnTrueIfCompanyComplete } from "@shared/functions/ReturnTrueIfCompanyComplete";
import { Controller } from "react-hook-form";
import MaskedInput from "react-input-mask";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";
import { usePlans } from "../../../hooks/usePlans";
import { OnboardingLayout } from "../../../layouts/UserOnboardingLayout/UserOnboardingLayout";
import { useCompanyForm } from "./hooks/useCompanyForm";
import { useGetCompanyApi } from "./hooks/useGetCompanyApi";

export function AuthCompanyRegister() {
  const {
    isLoading,
    handleNewCompany,
    formMethods,
  } = useCompanyForm();

  const {
    register,
    handleSubmit,
    control
  } = formMethods;

  const { getCompanyByCnpjApi } = useGetCompanyApi({ ...formMethods });

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
              <Input
                id="cnpj"
                as={MaskedInput}
                mask="99.999.999/9999-99"
                maskChar={null}
                {...register("cnpj", {
                  onChange: getCompanyByCnpjApi,
                })}
              />
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

          <FormControl isRequired>
            <FormLabel>Data Abertura</FormLabel>
            <Controller
              name="openAt"
              control={control}
              render={({ field }) => {
                const dateStr = field.value
                  ? new Date(field.value).toISOString().split('T')[0]
                  : undefined;

                return (
                  <Input
                    id="openAt"
                    type="date"
                    {...register("openAt", { valueAsDate: true })}
                    value={dateStr}
                  />
                )
              }}
            />
          </FormControl>
          <SimpleGrid w="full" columns={[1, 2]} spacingX={4} spacingY={8}>
            <FormControl isRequired flex={0.3}>
              <FormLabel htmlFor="ddd">DDD</FormLabel>
              <Input
                id="ddd"
                as={MaskedInput}
                mask="(999)"
                {...register("phone.ddd")}
              />
            </FormControl>
            <FormControl isRequired flex={1}>
              <FormLabel htmlFor="phoneNumber">Telefone</FormLabel>
              <Input
                as={MaskedInput}
                mask="99999-9999"
                id="phoneNumber"
                {...register("phone.number")}
              />
            </FormControl>
          </SimpleGrid>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email Institucional</FormLabel>
            <Input id="email" {...register("email")} />
          </FormControl>

          <SimpleGrid w="full" columns={[1, 1, 3]} spacingX={4} spacingY={8}>
            <FormControl isRequired >
              <FormLabel htmlFor="cep">CEP</FormLabel>
              <Input
                as={MaskedInput}
                mask="99999-999"
                id="cep"
                {...register("address.cep")}
              />
            </FormControl>
            <FormControl isRequired >
              <FormLabel htmlFor="uf">UF</FormLabel>
              <Input
                as={MaskedInput}
                mask="aa"
                id="uf"
                {...register("address.uf")}
              />
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
