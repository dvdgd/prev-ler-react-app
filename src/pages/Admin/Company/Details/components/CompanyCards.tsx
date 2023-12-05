import { Box, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { formatCep, formatCnpj } from "@shared/functions/Formatters";
import { getSubscriptionStatusText } from "@shared/functions/SubscriptionStatusMap";
import { TCompany } from "types/company";
import { ESubscriptionStatus } from "types/subscription";
import { MyInfoCard } from "./MyInfoCard";

type CompanyProps = { company: TCompany }

function CompanyInfoCard({ company }: CompanyProps) {
  const address = company.address;
  const phone = company.phone;

  return (
    <MyInfoCard title={company.fantasyName || "Empresa"}>
      <SimpleGrid
        columns={[1, 1, 1, 2]}
        columnGap={6}
        rowGap={6}
        alignContent={"space-evenly"}
        w="full"
      >
        <VStack spacing={1} w={"full"} alignItems={"start"}>
          <Text fontWeight={"medium"} fontSize={"md"}>Informações Gerais</Text>
          <Text fontSize={"md"}>CNPJ: {formatCnpj(company.cnpj || "")}</Text>
          <Text fontSize={"md"}>Razão Social: {company.companyName}</Text>
          <Text fontSize={"md"}>Data Abertura: {company.openAt.toLocaleDateString()}</Text>
        </VStack>
        <VStack spacing={1} w={"full"} alignItems={"start"}>
          <Text fontWeight={"medium"} fontSize={"md"}>Contato</Text>
          <Text fontSize={"md"}>({phone.ddd}) {phone.number}</Text>
          <Text fontSize={"md"} maxW={["132px", "132px", "132px", "132px", "294px"]}>
            <Link href={`mailto:${company.email}`}>{company.email}</Link>
          </Text>
          <Text fontSize={"md"}>{address.city} - {address?.uf}, {formatCep(address?.cep || "")}</Text>
        </VStack>
      </SimpleGrid>
    </MyInfoCard>
  )
}

function BlankSubscriptionCard() {
  return (
    <>
      <MyInfoCard title={"ASSINATURA CORRENTE"}>
        <SimpleGrid
          columns={[1, 1, 1, 2]}
          columnGap={6}
          rowGap={6}
          alignContent={"space-evenly"}
          w="full"
        >
          <VStack spacing={1} w={"full"} alignItems={"start"}>
            <Text fontWeight={"medium"} fontSize={"md"}>Assinatura X</Text>
            <Text fontSize={"md"}>Início: Não iniciada</Text>
            <Text fontSize={"md"}>Expiração: --</Text>
            <Text fontSize={"md"}>Status: Sem assinatura</Text>
          </VStack>
          <VStack spacing={1} w={"full"} alignItems={"start"}>
            <Text fontWeight={"medium"} fontSize={"md"}>Informações Plano</Text>
            <Text fontSize={"md"} maxW={["132px", "132px", "132px", "132px", "294px"]}>Sem plano</Text>
            <Text fontSize={"md"}>R$ --</Text>
            <Text fontSize={"md"}>Sem plano associado</Text>
          </VStack>
        </SimpleGrid>
      </MyInfoCard>
    </>
  )
}

function CurrentSubscriptionCard({ company }: CompanyProps) {

  const subscription = company.subscriptions?.at(0);
  if (!subscription) {
    return <BlankSubscriptionCard />
  }
  const plan = subscription?.plan;


  const planPeriodicyText = plan?.periodicy === "mensais" ? "mês" : "ano";
  const subscriptionStatus = subscription?.status || ESubscriptionStatus.canceled;
  const statusSubscriptionText = getSubscriptionStatusText(subscriptionStatus);

  return (
    <>
      <MyInfoCard title={"ASSINATURA CORRENTE"}>
        <SimpleGrid
          columns={[1, 1, 1, 2]}
          columnGap={6}
          rowGap={6}
          alignContent={"space-evenly"}
          w="full"
        >
          <VStack spacing={1} w={"full"} alignItems={"start"}>
            <Text fontWeight={"medium"} fontSize={"md"}>Assinatura {subscription?.subscriptionId}</Text>
            <Text fontSize={"md"}>Início: {subscription?.startDate?.toLocaleDateString()}</Text>
            <Text fontSize={"md"}>Expiração: {subscription?.expirationDate?.toLocaleDateString() || "--"}</Text>
            <Text fontSize={"md"}>Status: {statusSubscriptionText}</Text>
          </VStack>
          <VStack spacing={1} w={"full"} alignItems={"start"}>
            <Text fontWeight={"medium"} fontSize={"md"}>Informações Plano</Text>
            <Text fontSize={"md"} maxW={["132px", "132px", "132px", "132px", "294px"]}>{plan?.title} - Máximo de {plan?.maxUsers} usuários</Text>
            <Text fontSize={"md"}>R$ {plan?.value}/{planPeriodicyText}</Text>
            <Text fontSize={"md"}>{plan?.active ? "Ativo" : "Inativo"}</Text>
          </VStack>
        </SimpleGrid>
      </MyInfoCard>
    </>
  )
}

function BusinessRepresentativeCard({ company }: CompanyProps) {
  const person = company.users?.at(0);

  if (!person) {
    return (
      <>
        <MyInfoCard title={"Representante"}>
          <Text>Não encontrado</Text>
        </MyInfoCard>
      </>
    )
  }

  return (
    <>
      <MyInfoCard title={"REPRESENTANTE"} minH={"0"}>
        <SimpleGrid
          columns={[1, 1, 2, 2, 4]}
          columnGap={8}
          rowGap={4}
          w="full"
          alignContent={"flex-start"}
        >
          <Box>
            <Text fontWeight={"medium"} fontSize={"md"}>Nome completo</Text>
            <Text fontSize={"md"}>{person.firstName} {person.lastName}</Text>
          </Box>
          <Box>
            <Text fontWeight={"medium"} fontSize={"md"}>CPF</Text>
            <Text fontSize={"md"}>{person.cpf}</Text>
          </Box>
          <Box>
            <Text fontWeight={"medium"} fontSize={"md"}>Email</Text>
            <Text fontSize={"md"}>{person.email}</Text>
          </Box>
          <Box>
            <Text fontWeight={"medium"} fontSize={"md"}>Cargo</Text>
            <Text fontSize={"md"}>{person.jobRole || "Não informado"}</Text>
          </Box>
        </SimpleGrid>
      </MyInfoCard>
    </>
  )
}

export function CompanyCards({ company }: CompanyProps) {
  return (
    <>
      <BusinessRepresentativeCard company={company} />
      <SimpleGrid columns={[1, 1, 2]} columnGap={8} rowGap={8} w="full">
        <CompanyInfoCard company={company} />
        <CurrentSubscriptionCard company={company} />
      </SimpleGrid>
    </>
  )
}