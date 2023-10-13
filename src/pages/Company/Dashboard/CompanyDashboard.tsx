import { Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useCurrentUser";
import { OnboardingLayout } from "../../../shared/components/OnboardingLayout";

export function CompanyDashboard() {
  const { userSession } = useAuth();

  return (
    <OnboardingLayout>
      <Text flexWrap="wrap" maxWidth={500}>
        FALAAAAAAAAA MEU NOBRE REPRESENTANTE {JSON.stringify(userSession?.user || "", null, 4) ?? ""}
      </Text>
    </OnboardingLayout>
  );
}
