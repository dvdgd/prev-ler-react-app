
import { Box } from "@chakra-ui/react";
import { IChildrenProps } from "../../@types/react-base-props";
import { AuthDrawnerProvider } from "../../context/DrawnerProvider";
import { AuthHeader } from "./components/AuthHeader";

export function AuthPageLayout({ children }: IChildrenProps) {
  return (
    <AuthDrawnerProvider>
      <Box minH="100vh" bg="gray.50" w="full">
        <AuthHeader />
        {children}
      </Box>
    </AuthDrawnerProvider>
  )
}
