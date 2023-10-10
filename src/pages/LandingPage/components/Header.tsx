import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Spacer,
  Stack,
  chakra,
  useDisclosure
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

type NavLink = {
  name: string,
  link: string,
};

interface HeaderProps {
  title: string;
}

const LogoButton = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <Flex onClick={() => navigate("/")} cursor="pointer">
      <Image
        height={39}
        width={36}
        src="prev_ler_logo.svg"
        alt={title}
      />
    </Flex>
  );
}

const NavListComponent = () => {
  const { currentUser } = useCurrentUser();
  const navLinks: NavLink[] = [
    { name: "Funcionalidades", link: "/#features" },
    { name: "Preços", link: "/#pricing" },
    currentUser
      ? { name: "Sair", link: "/logout" }
      : { name: "Entrar/Cadastrar-se", link: "/login" }
  ];

  return (
    <>
      {
        navLinks.map((navLink: NavLink, i: number) => {
          return (
            <Link
              href={navLink.link}
              key={`navlink_${i}`}
              fontWeight={500}
              variant="ghost"
            >
              {navLink.name}
            </Link>
          );
        })
      }
    </>
  )
}

const DesktopSidebarContents = ({ title: name }: HeaderProps) => {
  return (
    <Container maxW={["full", "container.lg"]} p={0}>
      <Stack
        justify="space-between"
        p={[0, 4]}
        w="full"
        direction={["column", "row"]}
      >
        <LogoButton title={name} />
        <HStack
          align="flex-start"
          spacing={[4, 10]}
          alignItems="end"
        >
          <NavListComponent />
        </HStack>
      </Stack>
    </Container >
  );
};

const MobileSidebar = ({ title: name }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack w="full" align="center" alignItems="center">
        <LogoButton title={name} />
        <Spacer />
        <IconButton
          aria-label="Search database"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent bg="gray.50">
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
              <Stack
                align="flex-start"
                spacing="4"
                direction="column"
              >
                <NavListComponent />
              </Stack >
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>
    </>
  );
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <Box w="full" >
      <chakra.header id="header">
        <Box display={{ base: "flex", md: "none" }} p={4}>
          <MobileSidebar title={title} />
        </Box>

        <Box display={{ base: "none", md: "flex" }} bg="gray.50">
          <DesktopSidebarContents title={title} />
        </Box>
      </chakra.header>
    </Box>
  );
};
