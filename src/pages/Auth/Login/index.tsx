import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";
import { OnboardingLayout } from "../../../shared/components/OnboardingLayout";
import { PasswordInput } from "../../../shared/components/PasswordInput";
import { FormCard } from "../components/FormCard";

interface IFormLoginInputs {
  email: string;
  password: string;
}

export function Login() {
  const { register, handleSubmit, ...rest } = useForm<IFormLoginInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFormSubmit = async (loginFormAttributes: IFormLoginInputs) => {
    try {
      setIsLoading(true);
      await login(loginFormAttributes);
      navigate("/company/dashboard");
    } catch (error) {
      console.log("Got an error while logging a user", error);
    } finally {
      setIsLoading(false);
    }
  }

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
                <Link color={"blue.500"} href="/sign-up">
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
