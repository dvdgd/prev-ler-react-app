import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Center, Container, HStack, List, ListIcon, ListItem, SimpleGrid, Text, UseToastOptions, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TPlan } from "../../../@types/plan";
import { useShowToastErrorHandler } from "../../../hooks/useShowToastErrorHandler";
import { ClickMeButton } from "../../../shared/components/ClickMeButton";
import { PlanService } from "../../../shared/services/PlanService";

interface PricingCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  periodicy: string;
  maxUsers: number;
}

function PricingCard(props: PricingCardProps) {
  const pro = props.title === 'Profissional';

  return (
    <Box
      id="#princing"
      boxShadow="sm"
      p={6}
      rounded="lg"
      bg={pro ? "white" : "white"}
      borderColor={pro ? "brand.500" : "gray.200"}
      backgroundColor={pro ? "brand.50" : "white"}
      borderWidth={2}
    >
      <VStack spacing={3} align="flex-start">
        <Text fontWeight={600} casing="uppercase" fontSize="sm">
          {props.title}
        </Text>
        <Box w="full">
          <Text fontSize="3xl" fontWeight="medium">
            R$ {props.price} {props.periodicy}
          </Text>
        </Box>

        <Text>{props.description}</Text>

        <VStack pt={8} spacing={4} align="flex-start">
          <List spacing={3}>
            <ListItem>
              <HStack align="flex-start" spacing={1}>
                <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                <Text>
                  Até {props.maxUsers} usuários ativos.
                </Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
      </VStack>
    </Box>
  );
}

export default function PricingSection() {
  const navigate = useNavigate();
  const [pricings, setPrincings] = useState<PricingCardProps[]>([]);
  const { showErrorToast } = useShowToastErrorHandler();

  useEffect(() => {
    const toastErrorAttributes: UseToastOptions = {
      title: "Erro ao buscar informações dos planos.",
      description: "Desculpe, tente novamente mais tarde ou entre em contato com os administradores.",
      status: "error",
      duration: 3000,
      isClosable: true,
    };

    const fetchPlans = async () => {
      try {
        const plans = await new PlanService().getAllPlans();
        const pricings: PricingCardProps[] = plans.map(planToPricingCard);
        setPrincings([...pricings]);
      } catch (error) {
        showErrorToast({
          error,
          toastAttributes: toastErrorAttributes,
        });
      }
    }

    fetchPlans();
  }, [pricings, showErrorToast]);

  const planToPricingCard = (plan: TPlan): PricingCardProps => {
    const { planId, value, ...planProps } = plan;
    return {
      id: planId || 0,
      price: value,
      ...planProps
    };
  }

  return (
    <>
      <Container py={28} maxW="container.lg" w="full" id="pricing">
        <SimpleGrid columns={[1, null, 3]} spacing={10}>
          {
            pricings.length > 0 ? pricings.map((p) => (
              <PricingCard {...p} key={p.id} />
            )) : []
          }
        </SimpleGrid>
        <Center margin={8}>
          <ClickMeButton
            onClick={() => navigate("/check/sign-up")}
            text={"Começar"}
          />
        </Center>
      </Container >
    </>
  );
}