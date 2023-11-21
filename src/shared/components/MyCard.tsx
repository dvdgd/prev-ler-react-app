import { Box, BoxProps } from "@chakra-ui/react";
import { IChildrenProps } from "../../@types/react-base-props";

type MyCardProps = IChildrenProps & BoxProps;

export function MyCard({ children, ...boxProps }: MyCardProps) {
  return (
    <Box
      boxShadow="sm"
      p={6}
      rounded="lg"
      bg={"white"}
      borderColor={"gray.200"}
      backgroundColor={"white"}
      borderWidth={2}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

