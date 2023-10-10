import { HStack, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  return (
    <HStack bg="gray.50" h="full" minH="100vh">
      <VStack w="full" minH="100vh" align="center">
        <Header title="PrevLer" />
        {children}
      </VStack>
    </HStack>
  );
};
