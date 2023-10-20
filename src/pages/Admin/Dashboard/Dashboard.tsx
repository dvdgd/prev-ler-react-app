import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

export const Dashboard = () => {
  return (
    <Box
      display={"flex"}
      alignContent={"center"}
      justifyContent={"center"}
      w="100%"
      p="70px"
    >
      <Grid templateRows="repeat(2, 1fr)" w="100%" gap={5}>
        <GridItem colSpan={1} border={1} bg="blue">
          Pagamentos Recentes
        </GridItem>
        <GridItem colSpan={1}>
        </GridItem>
        <GridItem colSpan={2} border={1} bg="gray">
          Usuários Inadimplentes
        </GridItem>
      </Grid>
    </Box>
  );
};
