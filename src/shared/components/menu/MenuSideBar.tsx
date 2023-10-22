import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from "@chakra-ui/react";
import {
  TbMenu2,
} from "react-icons/tb";
import { IChildrenProps } from "../../../@types/react-base-props";

export const MenuSidebar = ({ children }: IChildrenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <TbMenu2
        size={28}
        onClick={onOpen}
        style={{ cursor: "pointer" }}
      />
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
          >
            Menu
          </DrawerHeader>
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
