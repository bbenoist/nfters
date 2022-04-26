import {
  forwardRef,
  Icon,
  InputElementProps,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { FaEthereum } from 'react-icons/fa';

export type EthInputProps = { value?: number; setValue: (value: number) => void };

const EthInputLeftElement = forwardRef<InputElementProps, 'div'>((props, ref) => (
  <InputLeftElement ref={ref} {...props}>
    <Icon fontSize="xl">
      <FaEthereum />
    </Icon>
  </InputLeftElement>
));

const InputValue = forwardRef<EthInputProps, 'input'>(({ value, setValue }, inputRef) => {
  const handleChange = useCallback((_valueAsString, newValue) => setValue(newValue), [setValue]);
  return (
    <NumberInput min={0} step={0.01} precision={2} onChange={handleChange} value={value}>
      <NumberInputField ref={inputRef} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
});

// https://github.com/chakra-ui/chakra-ui/issues/2269#issuecomment-712935052
Object.assign(EthInputLeftElement, { id: 'InputLeftElement' });
Object.assign(InputValue, { id: 'Input' });

export const EthInput = forwardRef<EthInputProps, 'input'>((props, ref) => (
  <InputGroup>
    {/* Chakra UI id trick does not work when field is repeated multiple times :-/ */}
    {/* <EthInputLeftElement /> */}
    <InputValue ref={ref} {...props} />
  </InputGroup>
));
