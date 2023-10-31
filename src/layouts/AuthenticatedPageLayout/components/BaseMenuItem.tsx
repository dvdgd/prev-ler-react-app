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
  const textColor = active ? "white" : ""
  const onHoverColor = hoverColor ?? "blue.400";
  const bgColor = active ? (activeColor ?? "blue.500") : "";

  return (
    <Flex flexDir="column" w="100%" alignItems={"flex-start"} onClick={onClick} textColor={textColor}>
      <Menu placement="right">
        <Link
          p={3}
          backgroundColor={bgColor}
          shadow={active ? "lg" : ""}
          _hover={{
            textDecor: "none",
            backgroundColor: onHoverColor,
            textColor: "white"
          }}
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

