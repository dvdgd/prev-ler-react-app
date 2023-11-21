import { EditIcon } from "@chakra-ui/icons";
import { IconButtonProps } from "@chakra-ui/react";
import { MyIconButton } from "./MyIconButton";

type DeleteIconProps = {
  onClick: () => void;
} & IconButtonProps;

export function EditIconAction({ onClick, ...props }: DeleteIconProps) {
  return (
    <>
      <MyIconButton
        icon={<EditIcon />}
        color={"blue.600"}
        buttonFn={onClick}
        cursor="pointer"
        {...props}
      />
    </>
  )
}
