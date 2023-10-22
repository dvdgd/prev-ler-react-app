import { TbDashboard, TbLogout } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthDrawner } from "../../../hooks/useAuthDrawner";
import { SidebarItem } from "./SideBarItem";

export function AdminSideBarItems() {
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
        icon={TbLogout}
        title="Sair"
        active={pathname.includes("logout")}
        onClick={() => navigate("/logout")}
      />
    </>
  )
}
