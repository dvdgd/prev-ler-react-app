import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type TPasswordInput = {
  label?: string;
  inputName: string;
  errorMessage?: string;
} & InputProps;

export function PasswordInput({
  label,
  inputName,
  ...props
}: TPasswordInput) {
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useFormContext();

  return (
    <FormControl isRequired>
      {label && (<FormLabel htmlFor={inputName}>{label}</FormLabel>)}
      <InputGroup>
        <Input id={inputName} {...register(inputName, { required: true })} {...props} type={showPassword ? 'text' : 'password'} />
        <InputRightElement h={'full'}>
          <Button
            variant={'ghost'}
            onClick={() => setShowPassword((showPassword) => !showPassword)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}
