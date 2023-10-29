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
import { LogoButton } from "../../../shared/components/LogoButton";
import { AdminMenuContents } from "./AdminMenuContents";
import { CompanyMenuContents } from "./CompanyMenuContents";
import { HamburguerMenu } from "./HamburguerMenu";
import { MenuAvatar } from "./MenuAvatar";

export const AuthHeader = () => {
  const { userSession } = useAuth();

  const isAdmin = userSession?.user?.profile?.userType === EUserType.administrador;

  return (
    <Box p={4} w="full">
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <HamburguerMenu>
          {isAdmin ? <AdminMenuContents /> : <CompanyMenuContents />}
        </HamburguerMenu>
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
