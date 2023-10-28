import { IconProps, ViewIcon } from "@chakra-ui/icons";

type ViewIconProps = {
  onClick: () => void;
} & IconProps;

export function ViewIconAction({ onClick, ...props }: ViewIconProps) {
  return (
    <>
      <ViewIcon
        color={"red.600"}
        onClick={onClick}
        cursor="pointer"
        {...props}
      />
    </>
  )
}
