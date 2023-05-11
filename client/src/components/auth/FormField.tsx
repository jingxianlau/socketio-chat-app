import React, { useState } from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
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
import { FormValues as SignupFormValues } from './SignUp';
import { FormValues as LoginFormValues } from './Login';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  formik: FormikProps<SignupFormValues> | FormikProps<LoginFormValues>;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  formik: { errors, touched },
  ...inputProps
}) => {
  const [show, setShow] = useState(false);

  switch (inputProps.type) {
    case 'password':
      return (
        <Field name={name}>
          {({ field, form }: FieldProps) => (
            <FormControl
              mb='5'
              isInvalid={(errors as any)[name] && (touched as any)[name]}
            >
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
                      mr='-2'
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <span className='material-symbols-outlined'>
                          visibility_off
                        </span>
                      ) : (
                        <span className='material-symbols-outlined'>
                          visibility
                        </span>
                      )}
                    </Button>
                  </InputRightElement>
                )}
              </InputGroup>
              <FormErrorMessage>
                <ErrorMessage name={name}>{msg => msg}</ErrorMessage>
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      );

    case 'file':
      return (
        <Field name={name}>
          {({ field, form }: FieldProps) => (
            <FormControl
              mb='5'
              isInvalid={(errors as any)[name] && (touched as any)[name]}
            >
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <Input {...(inputProps as InputProps)} {...field} p={1.5} />
              <FormErrorMessage>
                <ErrorMessage name={name}>{msg => msg}</ErrorMessage>
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      );

    default:
      return (
        <Field name={name}>
          {({ field }: FieldProps) => (
            <FormControl
              mb='5'
              isInvalid={(errors as any)[name] && (touched as any)[name]}
            >
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <Input {...(inputProps as InputProps)} {...field} />
              <FormErrorMessage>
                <ErrorMessage name={name}>{msg => msg}</ErrorMessage>
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      );
  }
};

export default FormField;
