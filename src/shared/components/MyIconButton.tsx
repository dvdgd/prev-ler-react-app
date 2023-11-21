import { IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react";

type MyIconButtonProps = {
  buttonFn: () => any;
} & IconButtonProps;

export function MyIconButton({ buttonFn: onClick, ...props }: MyIconButtonProps) {
  return (
    <>
      <Tooltip label={props["aria-label"]}>
        <IconButton
          onClick={onClick}
          cursor="pointer"
          {...props}
        />
      </Tooltip>
    </>
  )
}
