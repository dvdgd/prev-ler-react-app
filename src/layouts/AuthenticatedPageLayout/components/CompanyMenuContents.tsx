import { TbBusinessplan, TbDashboard, TbLogout } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthDrawner } from "../../../hooks/useAuthDrawner";
import { SidebarItem } from "./BaseMenuItem";

export function CompanyMenuContents() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleGoPage } = useAuthDrawner();

  return (
    <>
      <SidebarItem
        icon={TbDashboard}
        title="Dashboard"
        active={pathname.includes("dashboard")}
        onClick={() => handleGoPage("/auth/company/dashboard")}
      />
      <SidebarItem
        icon={TbBusinessplan}
        title="Detalhes da assinatura"
        active={pathname.includes("plan-details")}
        onClick={() => handleGoPage("/auth/company/plan-details")}
      />
      <SidebarItem
        icon={TbLogout}
        title="Sair"
        active={pathname.includes("logout")}
        onClick={() => navigate('/logout')}
      />
    </>
  )
}