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
import { PasswordInput } from "../../../components/PasswordInput";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { login } from "../../../services/AuthService";
import { Layout } from "../../LandingPage/components/Layout";
import { FormCard } from "../components/FormCard";

interface IFormLoginInputs {
  email: string;
  password: string;
}

export default function SigninCard() {
  const { register, handleSubmit, ...rest } = useForm<IFormLoginInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const onFormSubmit = async (loginFormAttributes: IFormLoginInputs) => {
    try {
      setIsLoading(true);
      const user = await login(loginFormAttributes);
      setCurrentUser(user);
      navigate("/company/register");
    } catch (error) {
      console.log("Got an error while logging a user", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
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
    </Layout>
  )
}
