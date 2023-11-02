import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "../../../layouts/UserOnboardingLayout/UserOnboardingLayout";
import { FormCard } from "../../../shared/components/Card/FormCard";
import { useSignUpForm } from "./hooks/useSignUpForm";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, isLoading, onFormSubmit, register } = useSignUpForm();
  const navigate = useNavigate();

  return (
    <OnboardingLayout>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormCard title="Cadastre-se">
          <HStack>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="firstName">Primeiro Nome</FormLabel>
                <Input
                  id="firstName"
                  {...register("profile.firstName", { required: true })}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel htmlFor="lastName">Último Nome</FormLabel>
                <Input id="lastName" {...register("profile.lastName")} />
              </FormControl>
            </Box>
          </HStack>

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

          <Button
            loadingText="Cadastrando..."
            colorScheme="brand"
            size="lg"
            type="submit"
            isLoading={isLoading}
          >
            Cadastrar
          </Button>

          <Stack pt={6}>
            <Text align={"center"}>
              Já é um usuário?{" "}
              <Link color={"blue.500"} onClick={() => navigate("/check/login")}>
                Faça o Login!
              </Link>
            </Text>
          </Stack>
        </FormCard>
      </form>
    </OnboardingLayout>
  );
}
