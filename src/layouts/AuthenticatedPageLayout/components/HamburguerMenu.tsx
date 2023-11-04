import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";
import { IChildrenProps } from "../../../@types/react-base-props";
import { useAuthDrawner } from "../../../hooks/useAuthDrawner";

export const HamburguerMenu = ({ children }: IChildrenProps) => {
  const { isOpen, onOpen, onClose } = useAuthDrawner();

  return (
    <Box >
      <Box>
        <HamburgerIcon
          boxSize={8}
          aria-label={"Abrir Menu"}
          onClick={isOpen ? onClose : onOpen}
          cursor={"pointer"}
        />
      </Box>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size={"xs"}>
        <DrawerOverlay mt={16} />
        <DrawerContent mt={16} >
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody
            p="0"
            display={"flex"}
            flexDir="column"
            alignItems={"flex-start"}
          >
            {children}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
