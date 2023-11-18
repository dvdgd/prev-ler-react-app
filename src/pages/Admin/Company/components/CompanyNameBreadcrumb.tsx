import { Text } from "@chakra-ui/react";
import { useCompanyByParam } from "../hooks/useCompanyByParam";

export function CompanyNameBreadcrumb() {
  const { company, isLoading } = useCompanyByParam();

  if (isLoading) {
    return <>Carregando...</>
  }

  const breadcrumbName = company?.fantasyName || "Detalhes"

  return (
    <>
      <Text>{breadcrumbName}</Text>
    </>
  )
}