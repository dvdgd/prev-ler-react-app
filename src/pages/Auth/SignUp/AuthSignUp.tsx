import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
import { cpf } from "cpf-cnpj-validator";
import { useState, } from "react";
import MaskedInput from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "../../../layouts/UserOnboardingLayout/UserOnboardingLayout";
import { useSignUpForm } from "./hooks/useSignUpForm";

export function AuthSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, isLoading, formMethods: { register, formState } } = useSignUpForm();
  const { errors } = formState;

  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <form onSubmit={handleSubmit}>
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

          <FormControl isRequired isInvalid={!!errors.profile?.cpf?.message}>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <Input
              id="cpf"
              as={MaskedInput}
              mask="999.999.999-99"
              maskChar={null}
              {...register("profile.cpf", {
                validate: (userCpf: string) => {
                  if (!cpf.isValid(userCpf)) {
                    return 'CPF inválido.'
                  }

                  return true;
                },
              })}
            />
            {errors.profile?.cpf?.message
              ? <FormErrorMessage>{errors.profile?.cpf?.message}</FormErrorMessage>
              : <></>}
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" {...register("email", { required: true })} />
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.password?.message}>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <InputGroup>
              <Input
                id="password"
                {...register("password", {
                  required: true,
                  validate: (password: string) => {
                    const passwordLengthRegex = /^.{8,}$/;
                    const passwordNumberRegex = /\d/;
                    const passwordSpecialCharRegex = /[^a-zA-Z0-9]/;

                    if (!passwordLengthRegex.test(password)) {
                      return 'Sua senha precisa ter 8 ou mais caracteres.';
                    }

                    if (!passwordNumberRegex.test(password)) {
                      return 'Sua senha precisa ter pelo menos um número.';
                    }

                    if (!passwordSpecialCharRegex.test(password)) {
                      return 'Sua senha precisa ter pelo menos um símbolo especial.';
                    }

                    return true;
                  },
                })}
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
            {errors.password?.message
              ? <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              : <>
                <FormHelperText>A senha precisa ter no mínimo 8 caracteres.</FormHelperText>
                <FormHelperText>A senha precisa ter pelo menos um número.</FormHelperText>
                <FormHelperText>A senha precisa ter pelo menos um caractere especial.</FormHelperText>
              </>}
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
