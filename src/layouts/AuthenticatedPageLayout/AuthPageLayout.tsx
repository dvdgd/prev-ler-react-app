
import { Center, HStack, VStack } from "@chakra-ui/react";
import { IChildrenProps } from "../../@types/react-base-props";
import { AuthDrawnerProvider } from "../../context/DrawnerProvider";
import { AuthHeader } from "./components/AuthHeader";

export function AuthPageLayout({ children }: IChildrenProps) {
  return (
    <AuthDrawnerProvider>
      <HStack bg="gray.50" h="full" minH="100vh">
        <VStack w="full" minH="100vh" align="center">
          <AuthHeader />
          <Center flex="1" maxW={"full"}>
            {children}
          </Center>
        </VStack>
      </HStack>
    </AuthDrawnerProvider>
  )
}
