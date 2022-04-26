import {
  forwardRef,
  Icon,
  IconButton,
  Input,
  InputElementProps,
  InputGroup,
  InputGroupProps,
  InputProps,
  InputRightElement,
  useControllableState,
  useMergeRefs
} from '@chakra-ui/react';
import { ChangeEvent, createContext, PropsWithChildren, useCallback, useContext, useRef } from 'react';
import { BsSearch, BsXCircle } from 'react-icons/bs';
import { SetRequired } from 'type-fest';

export type SearchInputProps = Omit<InputGroupProps, 'value' | 'onChange'> & {
  value?: string;
  onChange?: (value: string) => void;
  inputProps?: Omit<InputProps, 'value' | 'onChange'>;
};

export type SearchInputState = SetRequired<SearchInputProps, 'value' | 'onChange'>;

const SearchInputContext = createContext({} as SearchInputState);

const useSearchInput = () => useContext(SearchInputContext);

const SearchInputProvider = ({
  children,
  value: propsValue,
  onChange: propsOnChange,
  ...props
}: PropsWithChildren<SearchInputProps>) => {
  const [value, onChange] = useControllableState({
    defaultValue: '',
    value: propsValue,
    onChange: propsOnChange
  });
  return (
    <SearchInputContext.Provider value={{ ...props, value, onChange }}>
      {children}
    </SearchInputContext.Provider>
  );
};

const SearchInputValue = forwardRef<InputProps, 'input'>((props: InputProps, ref) => {
  const { value, onChange, inputProps } = useSearchInput();
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange]
  );
  return (
    <Input
      {...props}
      {...inputProps}
      data-testid="search-input-value"
      ref={ref}
      value={value}
      onChange={handleChange}
      placeholder="Search..."
      borderRadius="full"
    />
  );
});

const ClearSearchButton = () => {
  const { onChange } = useSearchInput();
  return (
    <IconButton
      data-testid="search-input-clear-button"
      icon={<BsXCircle />}
      aria-label="Clear search"
      fontSize="xl"
      onClick={useCallback(() => onChange(''), [onChange])}
      cursor="pointer"
      variant="unstyled"
      display="flex"
      alignItems="center"
    />
  );
};

const SearchIcon = () => (
  <Icon name="search" fontSize="xl">
    <BsSearch />
  </Icon>
);

const SearchInputRight = forwardRef<InputElementProps, 'div'>((props, ref) => {
  const { value } = useSearchInput();
  return (
    <InputRightElement ref={ref} {...props} justify="flex-end">
      {value.length > 0 ? <ClearSearchButton /> : <SearchIcon />}
    </InputRightElement>
  );
});

// https://github.com/chakra-ui/chakra-ui/issues/2269#issuecomment-712935052
Object.assign(SearchInputValue, { id: 'Input' });
Object.assign(SearchInputRight, { id: 'InputRightElement' });

export const SearchInputComponent = forwardRef<{}, 'input'>((_, inputRef) => {
  const { value, onChange, inputProps, ...props } = useSearchInput();
  const ref = useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergeRefs(ref, inputRef);
  return (
    <InputGroup {...props} ref={ref}>
      <SearchInputValue ref={mergedRef} />
      <SearchInputRight />
    </InputGroup>
  );
});

export const SearchInput = forwardRef<SearchInputProps, 'input'>((props, ref) => (
  <SearchInputProvider {...props}>
    <SearchInputComponent ref={ref} />
  </SearchInputProvider>
));
