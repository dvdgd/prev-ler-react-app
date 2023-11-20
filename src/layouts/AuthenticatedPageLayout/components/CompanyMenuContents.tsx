import { useAuthDrawner } from "@hooks/useAuthDrawner";
import { FaBuildingUser } from "react-icons/fa6";
import { RiOrganizationChart } from "react-icons/ri";
import { TbBusinessplan, TbDashboard } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { SidebarItem } from "./BaseMenuItem";

export function CompanyMenuContents() {
  const { pathname } = useLocation();
  const { handleGoPage } = useAuthDrawner();

  const routes = pathname.split("/");

  return (
    <>
      <SidebarItem
        icon={TbDashboard}
        title="Dashboard"
        active={routes.at(routes.length - 1)?.includes("dashboard")}
        onClick={() => handleGoPage("/auth/company/dashboard")}
      />
      <SidebarItem
        icon={TbBusinessplan}
        title="Gestão do plano"
        active={pathname.includes("plan-details")}
        onClick={() => handleGoPage("/auth/company/dashboard/plan-details")}
      />
      <SidebarItem
        icon={RiOrganizationChart}
        title="Cargos"
        active={pathname.includes("job-roles")}
        onClick={() => handleGoPage("/auth/company/dashboard/job-roles")}
      />
      <SidebarItem
        icon={FaBuildingUser}
        title="Usuários"
        active={pathname.includes("users")}
        onClick={() => handleGoPage("/auth/company/dashboard/users")}
      />
    </>
  );
}
