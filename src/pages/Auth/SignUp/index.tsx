import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
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
  Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { EUserType } from '../../../@types/profile';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { registerUser } from '../../../services/AuthService';
import { Layout } from '../../LandingPage/components/Layout';
import { FormCard } from '../components/FormCard';

interface IFormSignUpInputs {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
  }
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();

  const { register, handleSubmit } = useForm<IFormSignUpInputs>();

  const onFormSubmit = async (formAttributes: IFormSignUpInputs) => {
    try {
      setIsLoading(true);
      const user = await registerUser({
        email: formAttributes.email,
        password: formAttributes.password,
        profile: { ...formAttributes.profile, userType: EUserType.representante },
      });
      setCurrentUser(user);
      console.log("Logged with sucess");
    } catch (error) {
      console.log('Error while saving user', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormCard title='Cadastre-se'>
          <HStack>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="firstName" >Primeiro Nome</FormLabel>
                <Input id='firstName' {...register("profile.firstName", { required: true })} />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel htmlFor='lastName'>Último Nome</FormLabel>
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
              <Input id='password' {...register("password", { required: true })} type={showPassword ? 'text' : 'password'} />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Cadastrando..."
              colorScheme='brand'
              size="lg"
              type="submit"
              isLoading={isLoading}
            >
              Cadastrar
            </Button>
          </Stack>

          <Stack pt={6}>
            <Text align={'center'}>
              Já é um usuário? {" "}
              <Link color={'blue.500'} href="/check/login">
                Faça o Login!
              </Link>
            </Text>
          </Stack>
        </FormCard>
      </form>
    </Layout >
  )
}
