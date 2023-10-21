import {
  Avatar,
  Button,
  Center,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useCurrentUser";

export const MenuAvatar = () => {
  const { userSession } = useAuth();
  const [ isLoading ] = useState(false);
  const navigate = useNavigate();

  const handleLogout = ()=>{
    navigate("/logout");
  };

  return (
    <MenuList alignItems={"center"} pt="5px" mt="8px">
      <Center>
        <Avatar
          size={"2xl"}
          src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
        />
      </Center>
      <Center>
        <p>{userSession?.user?.profile?.firstName}</p>
      </Center>
      <MenuDivider />
      <Button
        borderRadius={0}
        variant={"ghost"}
        width={"100%"}
        justifyContent={"start"}
      >
        Perfil
      </Button>
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
