import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  Spacer,
  VStack
} from "@chakra-ui/react";

import { EUserType } from "../../../@types/profile";

import { useAuth } from "../../../hooks/useCurrentUser";
import { LogoButton } from "../../../shared/components/LogoButton";
import { AdminMenuContents } from "./AdminMenuContents";
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
      zIndex={2}
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
        </HamburguerMenu>
        <LogoButton />
        <Spacer />
        <AvatarMenuButton />
      </HStack>
      <Breadcrumb />
    </VStack>
  );
};
