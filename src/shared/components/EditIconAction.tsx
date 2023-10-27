import { EditIcon, IconProps } from "@chakra-ui/icons";

type DeleteIconProps = {
  onClick: () => void;
} & IconProps;

export function EditIconAction({ onClick, ...props }: DeleteIconProps) {
  return (
    <>
      <EditIcon
        color={"blue.600"}
        onClick={onClick}
        cursor="pointer"
        {...props}
      />
    </>
  )
}
