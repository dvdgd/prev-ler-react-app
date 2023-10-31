import {
  BackgroundProps,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

type TSidebarItem = {
  title: string;
  icon: IconType;
  active?: boolean;
  activeColor?: BackgroundProps["backgroundColor"];
  hoverColor?: BackgroundProps["backgroundColor"];
  onClick?: () => void;
} & TextProps;

const BaseMenuItem = ({
  title,
  icon,
  activeColor,
  hoverColor,
  active = false,
  onClick = () => { },
  ...props
}: TSidebarItem) => {
  return (
    <Flex flexDir="column" w="100%" alignItems={"flex-start"} onClick={onClick}>
      <Menu placement="right">
        <Link
          shadow={active ? "lg" : ""}
          backgroundColor={active ? (activeColor ?? "blue.500") : ""}
          p={3}
          _hover={{ textDecor: "none", backgroundColor: (hoverColor ?? "blue.400") }}
          w={"100%"}
        >
          <MenuButton w="100%">
            <Flex alignItems={"center"}>
              <Icon as={icon} fontSize="xl" />
              <Text ml={5} {...props}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export { BaseMenuItem as SidebarItem };

