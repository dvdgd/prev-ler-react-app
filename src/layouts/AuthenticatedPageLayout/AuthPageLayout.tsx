
import { Box, Center } from "@chakra-ui/react";
import { IChildrenProps } from "../../@types/react-base-props";
import { AuthDrawnerProvider } from "../../context/DrawnerProvider";
import { AuthHeader } from "./components/AuthHeader";

export function AuthPageLayout({ children }: IChildrenProps) {
  return (
    <AuthDrawnerProvider>
      <Box
        minH="100vh"
        bg="gray.50"
        w="full"
        display="flex"
        flexDirection="column"
      >
        <AuthHeader />
        <Center flex="1">
          {children}
        </Center>
      </Box>
    </AuthDrawnerProvider>
  )
}
