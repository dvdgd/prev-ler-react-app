import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Button, Container, HStack, List, ListIcon, ListItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabaseClient } from "../../../config/supabase";

interface PricingCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  periodicy: string;
  maxUsers: number;
}

type PlanoResponse = {
  id_plano: number;
  titulo: string;
  descricao: string;
  valor_plano: number;
  periodicidade: string;
  qtd_max_usuarios: number;
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
        <VStack>
          <Button size="sm" colorScheme="brand">
            Saiba mais →
          </Button>
        </VStack>

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
  const [pricings, setPrincings] = useState<PricingCardProps[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const { data } = await supabaseClient
      .from('plano')
      .select()
      .order('valor_plano', { ascending: true });

    const pricings: PricingCardProps[] | undefined = data?.map((p: PlanoResponse) => {
      return {
        id: p.id_plano,
        title: p.titulo,
        price: p.valor_plano,
        description: p.descricao,
        periodicy: p.periodicidade,
        maxUsers: p.qtd_max_usuarios,
      };
    });

    if (pricings) {
      setPrincings([...pricings]);
    }
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
      </Container >
    </>
  );
}