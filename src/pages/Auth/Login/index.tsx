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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { login } from "../../../service/authService";
import { Layout } from "../../LandingPage/components/Layout";
import { FormCard } from "../components/FormCard";

interface IFormLoginInputs {
  email: string;
  password: string;
}

export default function SigninCard() {
  const { register, handleSubmit } = useForm<IFormLoginInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const onFormSubmit = async ({ email, password }: IFormLoginInputs) => {
    try {
      setIsLoading(true);
      const user = await login({ email, password });
      setCurrentUser(user);
      navigate("/register-company");
    } catch (error) {
      console.log("Got an error while logging a user", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormCard title={"Faça o login em sua conta!"}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" {...register("email")} />
          </FormControl>
          <FormControl isRequired >
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input id="password" type="password" {...register("password")} />
          </FormControl>
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
    </Layout>
  )
}
