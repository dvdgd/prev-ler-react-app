import { TbBusinessplan, TbDashboard } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { useAuthDrawner } from "../../../hooks/useAuthDrawner";
import { SidebarItem } from "./BaseMenuItem";

export function AdminMenuContents() {
  const { pathname } = useLocation();
  const { handleGoPage } = useAuthDrawner();

  const routes = pathname.split("/");

  return (
    <>
      <SidebarItem
        icon={TbDashboard}
        title="Dashboard"
        active={routes.at(routes.length - 1)?.includes("dashboard")}
        onClick={() => handleGoPage("/auth/admin/dashboard")}
      />
      <SidebarItem
        icon={TbBusinessplan}
        title="Planos"
        active={pathname.includes("plans")}
        onClick={() => handleGoPage("/auth/admin/dashboard/plans")}
      />
    </>
  );
}
