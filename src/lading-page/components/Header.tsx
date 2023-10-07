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
  Heading,
  IconButton,
  Image,
  Link,
  Spacer,
  Stack,
  chakra,
  useDisclosure
} from "@chakra-ui/react";

type NavLink = {
  name: string,
  link: string,
};

const navLinks: NavLink[] = [
  { name: "Inicio", link: "/" },
  { name: "Funcionalidades", link: "#features" },
  { name: "Preços", link: "#pricing" },
  { name: "Entrar/Cadastra-se", link: "/signin" },
];

interface SidebarProps {
  name: string;
}

const DesktopSidebarContents = ({ name }: SidebarProps) => {
  return (
    <Container maxW={["full", "container.lg"]} p={0}>
      <Stack
        justify="space-between"
        p={[0, 4]}
        w="full"
        direction={["column", "row"]}
      >
        <Box display={{ base: "none", md: "flex" }}>
          <Image
            boxSize="30px"
            src="Logo_PrevLer.png"
            alt="logotipo Prevler"
            marginX="8px"
          />
          <Heading fontSize="xl">{name}</Heading>
        </Box>
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

const MobileSidebar = ({ name }: SidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex w="full" align="center">
        <Image
          boxSize="30px"
          src="Logo_PrevLer.png"
          alt="logotipo Prevler"
          marginX="8px"
        />
        <Heading fontSize="xl">{name}</Heading>
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

const Sidebar = ({ name }: SidebarProps) => {
  return (
    <chakra.header id="header">
      <Box display={{ base: "flex", md: "none" }} p={4}>
        <MobileSidebar name={name} />
      </Box>

      <Box display={{ base: "none", md: "flex" }} bg="gray.50">
        <DesktopSidebarContents name={name} />
      </Box>
    </chakra.header>
  );
};

interface HeaderProps {
  title: string;
}

export const Header = ({ title: name }: HeaderProps) => {
  return (
    <Box w="full">
      <Sidebar name={name} />
    </Box>
  );
};
