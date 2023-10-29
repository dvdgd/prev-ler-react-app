import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PlansTableAntd } from "./components/PlansTableAntd";

export function AdminPlans() {
  const navigate = useNavigate();

  return (
    <>
      <VStack w={"full"} p={8}>
        <PlansTableAntd />
        <Button
          colorScheme="brand"
          size={"lg"}
          onClick={() => navigate("create")}
        >
          Novo
        </Button>
      </VStack>
    </>
  );
}
