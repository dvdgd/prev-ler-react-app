import { HStack, VStack } from "@chakra-ui/react";
import { IChildrenProps } from "../../@types/react-base-props";
import { OnboardingHeader } from "./components/OnboardinHeader";

export function OnboardingLayout({
  children,
}: IChildrenProps) {
  return (
    <HStack bg="gray.50" h="full" minH="100vh">
      <VStack w="full" minH="100vh" align="center">
        <OnboardingHeader />
        {children}
      </VStack>
    </HStack>
  );
}
