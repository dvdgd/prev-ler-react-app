
import { Box, VStack } from "@chakra-ui/react";
import { IChildrenProps } from "../../@types/react-base-props";
import { AuthDrawnerProvider } from "../../context/DrawnerProvider";
import { Footer } from "../../shared/components/Footer";
import { AuthHeader } from "./components/AuthHeader";

export function AuthPageLayout({ children }: IChildrenProps) {
  return (
    <AuthDrawnerProvider>
      <VStack w="full" minH="100vh" align="center" bg="gray.50" h="full" >\
        <AuthHeader />
        <Box as="main" flex="1" maxW={"full"} mt={32}>
          {children}
        </Box>
        <Footer />
      </VStack>
    </AuthDrawnerProvider>
  )
}
