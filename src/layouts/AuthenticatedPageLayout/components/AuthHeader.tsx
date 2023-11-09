import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import { EUserType } from "../../../@types/profile";

import { TbLogout } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";
import { LogoButton } from "../../../shared/components/LogoButton";
import { AdminMenuContents } from "./AdminMenuContents";
import { SidebarItem } from "./BaseMenuItem";
import { Breadcrumb } from "./Breadcrumb";
import { CompanyMenuContents } from "./CompanyMenuContents";
import { HamburguerMenu } from "./HamburguerMenu";
import { MenuAvatar } from "./MenuAvatar";

function AvatarMenuButton() {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
        />
      </MenuButton>
      <MenuAvatar />
    </Menu>
  );
}

export const AuthHeader = () => {
  const { userSession } = useAuth();

  const isAdmin =
    userSession?.user?.profile?.userType === EUserType.administrador;

  return (
    <VStack
      zIndex={3}
      as="header"
      w={"full"}
      position={"fixed"}
      mb={16}
      bgColor={"white"}
    >
      <HStack
        py={2}
        px={8}
        w={"full"}
        alignItems={"end"}
        justifyContent={"flex-start"}
      >
        <HamburguerMenu>
          {isAdmin ? <AdminMenuContents /> : <CompanyMenuContents />}
          <LogoutSideBarItem />
        </HamburguerMenu>
        <LogoButton />
        <Spacer />
        <AvatarMenuButton />
      </HStack>
      <Breadcrumb />
    </VStack>
  );
};

function LogoutSideBarItem() {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <SidebarItem
        icon={TbLogout}
        title="Sair"
        activeColor={"red"}
        hoverColor={"red.400"}
        active={pathname.includes("logout")}
        onClick={onOpen}
      />

      <Modal
        isCentered
        size={isLargerThan900 ? "lg" : "xs"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ah que pena! Você está saindo...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Você tem certeza que deseja prosseguir?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => navigate("/logout")}
            >
              Sair
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
