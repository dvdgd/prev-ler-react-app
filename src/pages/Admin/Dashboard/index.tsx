import { Box, Card, Heading, Text, VStack } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { useAuth } from "../../../hooks/useCurrentUser";

export function AdminDashboard() {
  const { userSession } = useAuth();

  const DadosVendas = () => {
    const dataBar = {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
      datasets: [
        {
          label: "Valor",
          data: [1000, 2000, 3000, 4000, 5000, 6000],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

  return (
    <VStack>
      <Text flexWrap="wrap" maxWidth={500}>
        BOTA ERICK {JSON.stringify(userSession?.user || "", null, 4) ?? ""}
      </Text>

      <Box
          width="80%"
          margin="20px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Card>
            <Heading size="lg">Dados de vendas</Heading>
            <Bar
              data={dadosBar}
              width="200px"
              height="200px"
              label="Valor"
            />
          </Card>
          <Card>
            <Heading size="lg">Dados de acessos</Heading>
            <GraphLine
              data={dadosLine}
              width="200px"
              height="200px"
              label="Quantidade"
            />
          </Card>
        </Box>
    </VStack>

  );
};
}
