import { Center, HStack, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <HStack bg={"gray.500"} w={"full"} minH={7} boxShadow={"lg"} py={4} textColor={"white"}>
      <Center w={"full"}>
        <Text fontSize={"md"} textAlign={"center"} px={4}>
          &copy; copyright 2023 - PREVLER. Todos os direitos reservados
        </Text>
      </Center>
    </HStack>
  )
}
