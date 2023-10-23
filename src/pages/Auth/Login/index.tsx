import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormProvider } from "react-hook-form";
import { OnboardingLayout } from "../../../layouts/UserOnboardingLayout/UserOnboardingLayout";
import { PasswordInput } from "../../../shared/components/PasswordInput";
import { FormCard } from "../components/FormCard";
import { useLogin } from "./hooks/useLoginForm";

export function Login() {
  const {
    isLoading,
    onFormSubmit,
    register,
    rest,
    handleSubmit,
  } = useLogin();

  return (
    <OnboardingLayout>
      <FormProvider {...{ register, handleSubmit, ...rest }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormCard title={"Faça o login em sua conta!"}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" {...register("email")} />
            </FormControl>
            <PasswordInput inputName="password" label="Senha" />
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}>
              <Checkbox>Lembre-me</Checkbox>
              <Link color={"blue.500"}>Esqueci minha senha</Link>
            </Stack>
            <Button
              colorScheme="brand"
              loadingText="Entrando..."
              size="lg"
              type="submit"
              isLoading={isLoading}
            >
              Entrar
            </Button>
            <Stack pt={6}>
              <Text align={"center"}>
                Ainda não é usuário? {" "}
                <Link color={"blue.500"} href="/check/sign-up">
                  Cadastre-se
                </Link>
              </Text>
            </Stack>
          </FormCard>
        </form>
      </FormProvider>
    </OnboardingLayout>
  )
}
