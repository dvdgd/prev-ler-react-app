import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  Stack,
} from "@chakra-ui/react";
import { MenuAvatar } from "./MenuAvatar";
import { MenuSidebar } from "./MenuSideBar";

export const Navbar = () => {
  return (
    <Box bg={"purple"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <MenuSidebar />

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
