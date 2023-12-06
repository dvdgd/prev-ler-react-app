import { Button, Divider, HStack } from "@chakra-ui/react";
import { CompanyCards } from "@pages/Admin/Company/Details/components/CompanyCards";
import { FaBuildingUser } from "react-icons/fa6";
import { RiOrganizationChart } from "react-icons/ri";
import { TbBusinessplan } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";

export function CompanyDashboard() {
  const { userSession } = useAuth();
  const navigate = useNavigate();

  const userCompany = userSession?.user?.company
  if (!userCompany) {
    return <></>
  }

  Object.assign(userCompany, {
    users: [
      userSession.user?.profile,
    ]
  });

  return (
    <>
      <CompanyCards company={userCompany} />
      <Divider />
      <HStack w={'full'} spacing={8}>
        <Button
          w={"full"}
          h={14}
          size={"lg"}
          colorScheme="brand"
          leftIcon={<TbBusinessplan />}
          onClick={() => navigate('plan-details')}
        >
          Gestão do plano
        </Button>
        <Button
          w={"full"}
          h={14}
          size={"lg"}
          colorScheme="brand"
          leftIcon={<RiOrganizationChart />}
          onClick={() => navigate('job-roles')}
        >
          Cargos
        </Button>
        <Button
          w={"full"}
          h={14}
          size={"lg"}
          colorScheme="brand"
          leftIcon={<FaBuildingUser />}
          onClick={() => navigate('users')}
        >
          Usuários
        </Button>
      </HStack>
    </>
  );
}
