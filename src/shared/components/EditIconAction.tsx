import { EditIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";

type DeleteIconProps = {
  onClick: () => void;
} & IconButtonProps;

export function EditIconAction({ onClick, ...props }: DeleteIconProps) {
  return (
    <>
      <IconButton
        icon={<EditIcon />}
        color={"blue.600"}
        onClick={onClick}
        cursor="pointer"
        {...props}
      />
    </>
  )
}
