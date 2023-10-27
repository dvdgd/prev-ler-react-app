import { TbBusinessplan, TbDashboard, TbLogout } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthDrawner } from "../../../hooks/useAuthDrawner";
import { SidebarItem } from "./BaseMenuItem";

export function AdminMenuContents() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { handleGoPage } = useAuthDrawner();

  return (
    <>
      <SidebarItem
        icon={TbDashboard}
        title="Dashboard"
        active={pathname.includes("dashboard")}
        onClick={() => handleGoPage("/auth/admin/dashboard")}
      />
      <SidebarItem
        icon={TbBusinessplan}
        title="Planos"
        active={pathname.includes("plans")}
        onClick={() => handleGoPage("/auth/admin/plans")}
      />
      <SidebarItem
        icon={TbLogout}
        title="Sair"
        active={pathname.includes("logout")}
        onClick={() => navigate("/logout")}
      />
    </>
  )
}
