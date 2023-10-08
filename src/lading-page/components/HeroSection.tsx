import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface HeroSectionProps { }

export const HeroSection: FunctionComponent<HeroSectionProps> = () => {
  return (
    <Container maxW="container.lg">
      <Center p={4} minHeight="70vh">
        <VStack>
          <Container maxW="container.md" textAlign="center">
            <Heading size="2xl" mb={4} color="gray.700">
              Sistema de gestão e prevenção a Lesões por Esforço Repetitivo
            </Heading>

            <Text fontSize="xl" color="gray.500">
              Nosso sistema auxilia sua empresa a melhorar a saúde dos funcionários, permitindo que eles criem rotinas de exercícios para promover um ambiente de trabalho mais saudável.
            </Text>

            <Button
              mt={8}
              colorScheme="brand"
              // TODO: ir para pagina de cadastro
              onClick={() => {

              }}
            >
              Comece Já
            </Button>

          </Container>
        </VStack>
      </Center>
    </Container>
  );
};
