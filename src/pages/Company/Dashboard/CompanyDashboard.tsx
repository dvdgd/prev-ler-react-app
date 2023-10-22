import { Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useCurrentUser";

export function CompanyDashboard() {
  const { userSession } = useAuth();

  return (
    <Text flexWrap="wrap" maxWidth={500}>
      FALAAAAAAAAA MEU NOBRE REPRESENTANTE {JSON.stringify(userSession?.user || "", null, 4) ?? ""}
    </Text>
  );
}
