import { ViewIcon } from "@chakra-ui/icons";
import { IconButtonProps } from "@chakra-ui/react";
import { MyIconButton } from "./MyIconButton";

type IconActionProps = {
  onClick: () => void;
} & IconButtonProps;

export function ViewIconAction({ onClick, ...props }: IconActionProps) {
  return (
    <>
      <MyIconButton
        icon={<ViewIcon />}
        color={"brand.600"}
        onClick={onClick}
        cursor="pointer"
        {...props}
      />
    </>
  )
}
