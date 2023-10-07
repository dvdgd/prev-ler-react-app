import { Box, Spacer } from "@chakra-ui/react";
import FeaturesSection from "./components/FeaturesSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Layout } from "./components/Layout";
import PricingSection from "./components/PricingSection";

export default function LandingPage() {
  return (
    <>
      <Layout>
        <Box bg="grey.50">
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <Spacer />
          <Footer />
        </Box>
      </Layout>
    </>
  );
}