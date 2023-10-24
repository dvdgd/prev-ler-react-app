import { Box, Spacer, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useCurrentUser";
import PricingSection from "../../LandingPage/components/PricingSection";
import { CardsSection } from "./CardsSection";

export function CompanyPlanDetailsPage() {
  const { userSession } = useAuth();
  return (
    <>
      <Box bg="grey.50">
        <PricingSection />
        <Text flexWrap="wrap" maxWidth={500}>
      FALAAAAAAAAA MEU NOBRE REPRESENTANTE {JSON.stringify(userSession?.user || "", null, 4) ?? ""}
    </Text>
        <Spacer />
        <CardsSection />
      </Box>
    </>
  );
}
