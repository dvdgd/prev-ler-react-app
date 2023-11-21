import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { IChildrenProps } from "../@types/react-base-props";

interface IDrawnerProvider {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleGoPage: (pageRoute: string) => void;
}

export const AuthDrawnerContext = createContext(
  {} as IDrawnerProvider
);

export const AuthDrawnerProvider = ({ children }: IChildrenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleGoPage = (pageRoute: string) => {
    navigate(pageRoute);
    onClose();
  }

  return (
    <AuthDrawnerContext.Provider value={{ isOpen, onOpen, onClose, handleGoPage }}>
      {children}
    </AuthDrawnerContext.Provider>
  )
}
