import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Link
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      h="100vh"
      w="100%"
      p="10px 30px"
    >
      <WarningTwoIcon boxSize="100px" marginY="12px" />
      <Heading>Ops... Essa página não existe.</Heading>
      <Link
        fontWeight="semibold"
        fontSize={"18px"}
        mt="16px"
        onClick={() => navigate("/")}
        color="blue"
        textDecoration={"underline"}
      >
        Voltar para tela de ínicio{" "}
      </Link>
    </Box>
  );
};
