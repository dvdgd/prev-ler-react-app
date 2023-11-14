
import { VStack } from "@chakra-ui/react";
import { IChildrenProps } from "../../@types/react-base-props";
import { AuthDrawnerProvider } from "../../context/DrawnerProvider";
import { Footer } from "../../shared/components/Footer";
import { AuthHeader } from "./components/AuthHeader";

export function AuthPageLayout({ children }: IChildrenProps) {
  return (
    <AuthDrawnerProvider>
      <VStack w="full" minH="100vh" align="center" bg="gray.50" h="full" >\
        <AuthHeader />
        <VStack as="main" flex="1" w={["full", "full", "full", "62em", "80em"]} mt={32} p={8} gap={8}>
          {children}
        </VStack>
        <Footer />
      </VStack>
    </AuthDrawnerProvider>
  )
}
