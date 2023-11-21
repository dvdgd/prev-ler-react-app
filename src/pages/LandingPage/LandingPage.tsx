import { Box, Spacer } from "@chakra-ui/react";
import { OnboardingLayout } from "../../layouts/UserOnboardingLayout/UserOnboardingLayout";
import FeaturesSection from "./components/FeaturesSection";
import { HeroSection } from "./components/HeroSection";
import PricingSection from "./components/PricingSection";

export function LandingPage() {
  return (
    <>
      <OnboardingLayout>
        <Box>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <Spacer />
        </Box>
      </OnboardingLayout>
    </>
  );
}
