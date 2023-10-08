'use client'

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../LandingPage/components/Layout';

export default function SigninCard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Faça o login em sua conta!</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Lembre-me</Checkbox>
                  <Link color={'blue.500'}>Esqueci minha senha</Link>
                </Stack>
                <Button
                  colorScheme="brand"
                >
                  Logar
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Ainda não é usuário? {" "}
                  <Link color={'blue.500'} onClick={() => navigate("/sign-up")}>
                    Cadastre-se
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  )
}