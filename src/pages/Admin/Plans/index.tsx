import { Box, Button, Card, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PlansTableAntd } from "./components/PlansTableAntd";

export function AdminPlans() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        w={"full"}
        p={6}
      >
        <Card
          shadow={"xl"}
          size={"sm"}
        >
          <VStack p={6} spacing={8}>
            <Box w={"full"} alignItems={"left"}>
              <Heading size={"lg"}>
                Planos
              </Heading>
            </Box>
            <PlansTableAntd />
            <Button
              colorScheme="brand"
              size={"lg"}
              onClick={() => navigate("create")}
            >
              Novo
            </Button>
          </VStack>
        </Card>
      </Box>
    </>
  );
}
