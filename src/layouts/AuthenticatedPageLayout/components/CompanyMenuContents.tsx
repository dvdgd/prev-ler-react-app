import { TbBusinessplan, TbDashboard, TbLogout } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthDrawner } from "../../../hooks/useAuthDrawner";
import { SidebarItem } from "./BaseMenuItem";

export function CompanyMenuContents() {
  const navigate = useNavigate();
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
        title="Detalhes da assinatura"
        active={pathname.includes("plan-details")}
        onClick={() => handleGoPage("/auth/company/dashboard/plan-details")}
      />
      <SidebarItem
        icon={TbLogout}
        title="Sair"
        activeColor={"red"}
        hoverColor={"red.400"}
        active={pathname.includes("logout")}
        onClick={() => navigate("/logout")}
      />
    </>
  )
}