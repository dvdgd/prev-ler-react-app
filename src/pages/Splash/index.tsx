import { Box, Center, Spinner } from "@chakra-ui/react";

export const SplashPage = () => {
  return (
    <Center h="100vh" bgColor={"gray.50"}>
      <Box>
        <Spinner size="xl" />
      </Box>
    </Center>
  );
};
