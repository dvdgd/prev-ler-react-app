import { Box, Spacer } from "@chakra-ui/react";
import { OnboardingLayout } from "../../../shared/components/OnboardingLayout";
import PricingSection from "../../LandingPage/components/PricingSection";

export function CompanyPlanDetailsPage() {
  return (
    <>
      <OnboardingLayout>
        <Box bg="grey.50">
          <PricingSection />
          <Spacer />
        </Box>
      </OnboardingLayout>
    </>
  );
}
