import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";

type EditIconProps = {
  onClick: () => void;
} & IconButtonProps;

export function DeleteIconAction({ onClick, ...props }: EditIconProps) {
  return (
    <>
      <IconButton
        icon={<DeleteIcon />}
        color={"red.600"}
        onClick={onClick}
        cursor="pointer"
        {...props}
      />
    </>
  )
}
