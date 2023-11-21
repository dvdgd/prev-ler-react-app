import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";
import { FormCard } from "@shared/components/Card/FormCard";
import { useState, } from "react";
import MaskedInput from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "../../../layouts/UserOnboardingLayout/UserOnboardingLayout";
import { useSignUpForm } from "./hooks/useSignUpForm";

export function AuthSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, isLoading, onFormSubmit, register } = useSignUpForm();
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormCard title="Cadastre-se" maxW={"md"}>
          <SimpleGrid w="full" columns={[1, 2]} spacingX={4} spacingY={8}>
            <FormControl isRequired>
              <FormLabel htmlFor="firstName">Primeiro Nome</FormLabel>
              <Input
                id="firstName"
                {...register("profile.firstName", { required: true })}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="lastName">Último Nome</FormLabel>
              <Input id="lastName" {...register("profile.lastName")} />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <Input
              id="cpf"
              as={MaskedInput}
              mask="999.999.999-99"
              maskChar={null}
              {...register("profile.cpf")}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" {...register("email", { required: true })} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <InputGroup>
              <Input
                id="password"
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <VStack spacing={4} mt={3}>
            <Button
              loadingText="Cadastrando..."
              colorScheme="brand"
              size="lg"
              type="submit"
              isLoading={isLoading}
            >
              Cadastrar
            </Button>
            <Text align={"center"}>
              Já é um usuário?{" "}
              <Link color={"blue.500"} onClick={() => navigate("/check/login")}>
                Faça o Login!
              </Link>
            </Text>
          </VStack>
        </FormCard>
      </form>
    </OnboardingLayout>
  );
}
