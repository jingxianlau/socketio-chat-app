import React, { useState } from 'react';
import { Field, FieldProps } from 'formik';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from '@chakra-ui/react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  ...inputProps
}) => {
  const [show, setShow] = useState(false);

  switch (inputProps.type) {
    case 'password':
      return (
        <Field name={name}>
          {({ field, form }: FieldProps) => (
            <FormControl mb='5'>
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <InputGroup>
                <Input
                  {...(inputProps as InputProps)}
                  {...field}
                  type={show ? 'text' : 'password'}
                />
                {form.values[name] && (
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={() => setShow(!show)}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                )}
              </InputGroup>
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      );

    case 'file':
      return (
        <Field name={name}>
          {({ field, form }: FieldProps) => (
            <FormControl mb='5'>
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <Input {...(inputProps as InputProps)} {...field} p={1.5} />
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      );

    default:
      return (
        <Field name={name}>
          {({ field, form }: FieldProps) => (
            <FormControl mb='5'>
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <Input {...(inputProps as InputProps)} {...field} />
              <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      );
  }
};

export default FormField;
