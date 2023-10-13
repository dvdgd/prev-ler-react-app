import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Spacer,
  chakra
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useCurrentUser";

type ActionButton = {
  name: string;
  link: string;
  colorScheme: string;
};

interface HeaderProps {
  title: string;
}

const LogoButton = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate("/")} cursor="pointer">
      <Image
        height={39}
        width={36}
        src="prev_ler_logo.svg"
        alt={title}
      />
    </Box>
  );
}

const DesktopSidebarContents = ({ title: name }: HeaderProps) => {
  const navigate = useNavigate();
  const { userSession: currentUser } = useAuth();
  const navLink: ActionButton = currentUser
    ? { name: "Sair", link: "/logout", colorScheme: "red" }
    : { name: "Entrar", link: "/check/login", colorScheme: "brand" }

  return (
    <Container maxW={["full", "container.lg"]} p={5} marginBottom={12}>
      <HStack justify="space-between" w="full" alignItems="end">
        <LogoButton title={name} />
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

export const OnboardingHeader = ({ title }: HeaderProps) => {
  return (
    <Box w="full" >
      <chakra.header id="header">
        <Box bg="gray.50">
          <DesktopSidebarContents title={title} />
        </Box>
      </chakra.header>
    </Box>
  );
};
