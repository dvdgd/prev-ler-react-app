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
  IconButton,
  Image,
  Link,
  Spacer,
  Stack,
  chakra,
  useDisclosure
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type NavLink = {
  name: string,
  link: string,
};

const navLinks: NavLink[] = [
  { name: "Funcionalidades", link: "#features" },
  { name: "Preços", link: "#pricing" },
  { name: "Entrar/Cadastrar-se", link: "/login" },
];

interface HeaderProps {
  title: string;
}

export const LogoButton = ({ title }: HeaderProps) => {
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
        <Spacer />
        <Stack
          align="flex-start"
          spacing={[4, 10]}
          direction={["column", "row"]}
        >
          {navLinks.map((navLink: NavLink, i: number) => {
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
          })}
        </Stack>
      </Stack>
    </Container>
  );
};

const MobileSidebar = ({ title: name }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex w="full" align="center">
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
                {navLinks.map((navLink: NavLink, i: number) => {
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
                })}
              </Stack >
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};

const Sidebar = ({ title: name }: HeaderProps) => {
  return (
    <chakra.header id="header">
      <Box display={{ base: "flex", md: "none" }} p={4}>
        <MobileSidebar title={name} />
      </Box>

      <Box display={{ base: "none", md: "flex" }} bg="gray.50">
        <DesktopSidebarContents title={name} />
      </Box>
    </chakra.header>
  );
};

export const Header = ({ title: name }: HeaderProps) => {
  return (
    <Box w="full">
      <Sidebar title={name} />
    </Box>
  );
};
