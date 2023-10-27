import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, HStack, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react";
import { MyCard } from "../../../shared/components/MyCard";

export function CompanyPlanDetailsPage() {
  return (
    <VStack>
      <HStack>
        <MyCard>
          <VStack spacing={3} align="flex-start">
            <Text fontWeight={600} casing="uppercase" fontSize="sm">
              {"BASICÃO"}
            </Text>

            <Box w="full">
              <Text fontSize="3xl" fontWeight="medium">
                R$ {"R$ 2000,00"} {"MENSAL"}
              </Text>
            </Box>
            <Text>{"IDEAL PARA FALIR O RH"}</Text>

            <VStack pt={8} spacing={4} align="flex-start">
              <List spacing={3}>
                <ListItem>
                  <HStack align="flex-start" spacing={1}>
                    <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                    <Text>
                      Até {"MÁXIMO DE 27,5 USUÁRIOS"} usuários ativos.
                    </Text>
                  </HStack>
                </ListItem>
              </List>
            </VStack>
          </VStack>
        </MyCard>
        <MyCard>
          <VStack spacing={3} align="flex-start">
            <Text fontWeight={600} casing="uppercase" fontSize="sm">
              {"BASICÃO"}
            </Text>

            <Box w="full">
              <Text fontSize="3xl" fontWeight="medium">
                R$ {"R$ 2000,00"} {"MENSAL"}
              </Text>
            </Box>

            <Text>{"IDEAL PARA FALIR O RH"}</Text>

            <VStack pt={8} spacing={4} align="flex-start">
              <List spacing={3}>
                <ListItem>
                  <HStack align="flex-start" spacing={1}>
                    <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                    <Text>
                      Até {"MÁXIMO DE 27,5 USUÁRIOS"} usuários ativos.
                    </Text>
                  </HStack>
                </ListItem>
              </List>
            </VStack>
          </VStack>
        </MyCard>
      </HStack>
      <Text fontSize="3xl" fontWeight="medium">
        R$ {"R$ 2000,00"} {"MENSAL"}
      </Text>
    </VStack>
  );
}
