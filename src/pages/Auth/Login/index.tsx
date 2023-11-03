import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack
} from "@chakra-ui/react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "../../../layouts/UserOnboardingLayout/UserOnboardingLayout";
import { FormCard } from "../../../shared/components/Card/FormCard";
import { PasswordInput } from "../../../shared/components/PasswordInput";
import { useLogin } from "./hooks/useLoginForm";

export function Login() {
  const {
    isLoading,
    onFormSubmit,
    register,
    rest,
    handleSubmit,
  } = useLogin();
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <FormProvider {...{ register, handleSubmit, ...rest }}>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormCard title={"Login"}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" {...register("email")} />
            </FormControl>
            <PasswordInput inputName="password" label="Senha" />
            <Box
              w={"full"}
              textAlign={"start"}
            >
              <Link color={"blue.500"}>Esqueci minha senha</Link>
            </Box>
            <VStack spacing={4} mt={3}>
              <Button
                colorScheme="brand"
                loadingText="Entrando..."
                size="lg"
                type="submit"
                isLoading={isLoading}
              >
                Entrar
              </Button>
              <Text align={"center"}>
                Ainda não é usuário? {" "}
                <Link color={"blue.500"} onClick={() => navigate("/check/sign-up")}>
                  Cadastre-se
                </Link>
              </Text>
            </VStack>
          </FormCard>
        </form>
      </FormProvider>
    </OnboardingLayout >
  )
}
