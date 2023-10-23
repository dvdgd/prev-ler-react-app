import { Box, Spacer } from "@chakra-ui/react";
import { OnboardingLayout } from "../../layouts/UserOnboardingLayout/UserOnboardingLayout";
import FeaturesSection from "./components/FeaturesSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import PricingSection from "./components/PricingSection";

export function LandingPage() {
  return (
    <>
      <OnboardingLayout>
        <Box bg="grey.50">
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <Spacer />
          <Footer />
        </Box>
      </OnboardingLayout>
    </>
  );
}
