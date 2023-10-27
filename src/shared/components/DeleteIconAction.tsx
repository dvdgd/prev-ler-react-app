import { DeleteIcon, IconProps } from "@chakra-ui/icons";

type EditIconProps = {
  onClick: () => void;
} & IconProps;

export function DeleteIconAction({ onClick, ...props }: EditIconProps) {
  return (
    <>
      <DeleteIcon
        color={"red.600"}
        onClick={onClick}
        cursor="pointer"
        {...props}
      />
    </>
  )
}
