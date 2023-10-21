import { Box, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useCurrentUser";

export function AdminDashboard() {
  const { userSession } = useAuth();

  return (
    <Box>
      <Text flexWrap="wrap" maxWidth={500}>
        BOTA ERICK {JSON.stringify(userSession?.user || "", null, 4) ?? ""}
      </Text>
    </Box>

  );
}
