import {
  Box,
  Button,
  Container,
  HStack,
  Spacer,
  chakra
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";
import { LogoButton } from "../../../shared/components/LogoButton";

type ActionButton = {
  name: string;
  link: string;
  colorScheme: string;
};

const DesktopSidebarContents = () => {
  const navigate = useNavigate();
  const { userSession: currentUser } = useAuth();
  const navLink: ActionButton = currentUser
    ? { name: "Sair", link: "/logout", colorScheme: "red" }
    : { name: "Entrar", link: "/check/login", colorScheme: "brand" }

  return (
    <Container maxW={["full", "container.lg"]} p={4} marginBottom={0}>
      <HStack justify="space-between" w="full" alignItems="end">
        <LogoButton />
        <Spacer />
        <Button
          onClick={() => navigate(navLink.link)}
          marginRight={2}
          colorScheme={navLink.colorScheme}
        >
          {navLink.name}
        </Button>
      </HStack>
    </Container >
  );
};

export const OnboardingHeader = () => {
  return (
    <Box w="full" >
      <chakra.header id="header">
        <Box bg="gray.50">
          <DesktopSidebarContents />
        </Box>
      </chakra.header>
    </Box>
  );
};
