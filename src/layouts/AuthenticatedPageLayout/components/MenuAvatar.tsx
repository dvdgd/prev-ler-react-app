import {
  Avatar,
  Button,
  Center,
  MenuDivider,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";

export const MenuAvatar = () => {
  const { userSession } = useAuth();
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <MenuList alignItems={"center"} pt="5px" mt="8px" shadow={"2xl"}>
      <Center p={2}>
        <Avatar
          size={"2xl"}
          src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
        />
      </Center>
      <Center>
        <Text>
          {userSession?.user?.profile?.firstName}
        </Text>
      </Center>
      <Center>
        <Text fontSize="sm" as="em">
          {userSession?.user?.profile?.userType.toUpperCase()}
        </Text>
      </Center>
      <MenuDivider />
      <Button
        borderRadius={0}
        justifyContent={"space-between"}
        variant={"ghost"}
        width={"100%"}
        isLoading={isLoading}
        onClick={handleLogout}
        rightIcon={<TbLogout color="red" size={20} />}
      >
        Sair
      </Button>
    </MenuList>
  );
};
