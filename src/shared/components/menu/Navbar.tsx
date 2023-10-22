import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  Stack,
} from "@chakra-ui/react";
import { EUserType } from "../../../@types/profile";
import { useAuth } from "../../../hooks/useCurrentUser";
import { LogoButton } from "../LogoButton";
import { AdminSideBarItems } from "./AdminSideBarItems";
import { CompanySideBarItems } from "./CompanySidebarItems";
import { MenuAvatar } from "./MenuAvatar";
import { MenuSidebar } from "./MenuSideBar";

export const Navbar = () => {
  const { userSession } = useAuth();

  const isAdmin = userSession?.user?.profile?.userType === EUserType.administrador;

  return (
    <Box p={4} marginBottom={8}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <MenuSidebar>
          {isAdmin ? <AdminSideBarItems /> : <CompanySideBarItems />}
        </MenuSidebar>
        <LogoButton />

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
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
                  src={
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                />
              </MenuButton>
              <MenuAvatar />
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};
