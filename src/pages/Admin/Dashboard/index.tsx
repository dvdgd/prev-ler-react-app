import { Text, VStack } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useCurrentUser";

export function AdminDashboard() {
  const { userSession } = useAuth();      

  return (
    <VStack>
      <Text flexWrap="wrap" maxWidth={500}>
        BOTA ERICK {JSON.stringify(userSession?.user || "", null, 4) ?? ""}
      </Text>

    </VStack>

  );
}

