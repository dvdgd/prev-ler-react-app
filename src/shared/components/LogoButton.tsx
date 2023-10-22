import { Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const LogoButton = () => {
  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate("/")} cursor="pointer">
      <Image
        height={39}
        width={36}
        src="prev_ler_logo.svg"
        alt="Logotipo PrevLer"
      />
    </Box>
  );
}