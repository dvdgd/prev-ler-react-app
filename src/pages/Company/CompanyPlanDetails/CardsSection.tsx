import { Box, List, ListItem, Spacer, VStack } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useCurrentUser";

export function CardsSection() {
  const { userSession } = useAuth();
  return (
    <>
    
        <Box bg="grey.50">
          <Box
      id="#princing"
      boxShadow="sm"
      p={6}
      rounded="lg"
      bg={"white"}
      borderColor={"gray.200"}
      backgroundColor={"white"}
      borderWidth={2}
    >
      <VStack spacing={3} align="flex-start">
        <Text fontWeight={600} casing="uppercase" fontSize="sm">
          {props.title}
        </Text>
        <Text fontWeight={600} casing="uppercase" fontSize="sm">
        PODE APAGAR: {JSON.stringify(userSession?.user || "", null, 4) ?? ""} 
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
          <Spacer />
        </Box>
      </>
  );
}
