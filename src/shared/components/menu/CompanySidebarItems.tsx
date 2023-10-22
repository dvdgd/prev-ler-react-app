import { TbDashboard, TbLogout } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarItem } from "./SideBarItem";

export function CompanySideBarItems() {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <>
      <SidebarItem
        icon={TbDashboard}
        title="Dashboard"
        active={pathname.includes("dashboard")}
        onClick={() => navigate("/auth/company/dashboard")}
      />
      <SidebarItem
        icon={TbLogout}
        title="Sair"
        active={pathname.includes("logout")}
        onClick={handleLogout}
      />
    </>
  )
}