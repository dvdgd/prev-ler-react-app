import { Box, HStack, VStack } from "@chakra-ui/react";
import { IChildrenProps } from "../../@types/react-base-props";
import { Footer } from "../../shared/components/Footer";
import { OnboardingHeader } from "./components/OnboardinHeader";

export function OnboardingLayout({
  children,
}: IChildrenProps) {
  return (
    <HStack bg="gray.50" h="full" minH="100vh">
      <VStack w="full" minH="100vh" align="center">
        <OnboardingHeader />
        <Box maxW={"full"} flex="1">
          {children}
        </Box>
        <Footer />
      </VStack>
    </HStack>
  );
}
