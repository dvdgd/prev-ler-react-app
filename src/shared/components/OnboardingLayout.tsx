import { HStack, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { OnboardingHeader } from "./OnboardinHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export const OnboardingLayout: FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  return (
    <HStack bg="gray.50" h="full" minH="100vh">
      <VStack w="full" minH="100vh" align="center">
        <OnboardingHeader title="PrevLer" />
        {children}
      </VStack>
    </HStack>
  );
};
