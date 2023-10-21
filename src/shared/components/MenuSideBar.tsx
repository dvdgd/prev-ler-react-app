import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from "@chakra-ui/react";
import {
  TbBarbell,
  TbCalendar,
  TbCircleDashed,
  TbDeviceImac,
  TbFileInvoice,
  TbGenderAndrogyne,
  TbLockOpen,
  TbLogout,
  TbMenu2,
  TbPigMoney,
  TbTrophy,
  TbUser,
  TbUsers
} from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { EUserType } from "../../@types/profile";
import { useAuth } from "../../hooks/useCurrentUser";
import { SidebarItem } from "./SideBarItem";

export const MenuSidebar = () => {
  const { userSession } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdmin = userSession?.user?.profile?.userType === EUserType.administrador;
  
  const handleLogout = ()=>{
    navigate("/logout");
  }

  return (
    <Box>
      <TbMenu2
        size={32}
        onClick={onOpen}
        color="#ECC94B"
        style={{ cursor: "pointer" }}
      />
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            onClick={() =>{}}
            cursor={"pointer"}
          >
            Prevler
          </DrawerHeader>
          <DrawerBody
            p="0"
            display={"flex"}
            flexDir="column"
            alignItems={"flex-start"}
          >
            {isAdmin ? (
              <>
                <SidebarItem
                  icon={TbCalendar}
                  title="Aulas"
                  active={pathname.includes("class")}
                  onClick={() =>{}}
                />
                <SidebarItem
                  icon={TbUsers}
                  title="Usuários"
                  active={pathname.includes("user")}
                  onClick={() =>{}}
                />
                <SidebarItem
                  icon={TbFileInvoice}
                  title="Pagamentos"
                  active={pathname.includes("payment")}
                  onClick={() =>{}}
                />
                <SidebarItem
                  icon={TbBarbell}
                  title="Exercícios"
                  onClick={() =>{}}
                  active={pathname.includes("exercise")}
                />
                <SidebarItem
                  icon={TbCircleDashed}
                  title="Status"
                  onClick={() =>{}}
                  active={pathname.includes("status")}
                />
                <SidebarItem
                  icon={TbLockOpen}
                  title="Perfis"
                  onClick={() =>{}}
                  active={pathname.includes("profile")}
                />
                <SidebarItem
                  icon={TbGenderAndrogyne}
                  title="Gêneros"
                  onClick={() =>{}}
                  active={pathname.includes("gender")}
                />
                <SidebarItem
                  icon={TbPigMoney}
                  title="Tipo de Pagamento"
                  onClick={() =>{}}
                  active={pathname.includes("paymentType")}
                />
                <SidebarItem
                  icon={TbDeviceImac}
                  title="Página de visitação"
                  active={pathname.includes("visit-page")}
                />
                <SidebarItem
                  icon={TbLogout}
                  title="Sair"
                  active={pathname.includes("logout")}
                  onClick={() => handleLogout()}
                />
              </>
            ) : (
              <>
                <SidebarItem
                  icon={TbBarbell}
                  title="Registrar Exercício"
                  active={pathname.includes("register-points")}
                />
                <SidebarItem
                  icon={TbPigMoney}
                  title="Cobranças"
                  active={pathname.includes("invoices")}
                />
                <SidebarItem
                  icon={TbTrophy}
                  title="Ranking"
                  active={pathname.includes("ranking")}
                />
                <SidebarItem
                  icon={TbUser}
                  title="Perfil"
                  active={pathname.includes("student/profile")}
                />
                <SidebarItem
                  icon={TbLogout}
                  title="Sair"
                  active={pathname.includes("logout")}
                  onClick={() => handleLogout()}
                />
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
