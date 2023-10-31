import { ViewIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";

type IconActionProps = {
  onClick: () => void;
} & IconButtonProps;

export function ViewIconAction({ onClick, ...props }: IconActionProps) {
  return (
    <>
      <IconButton
        icon={<ViewIcon />}
        color={"brand.600"}
        onClick={onClick}
        cursor="pointer"
        {...props}
      />
    </>
  )
}
