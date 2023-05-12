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
  InputRightElement,
  useToast
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

  const toast = useToast();
  const postDetails = async (
    file: File | null,
    setValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const error = () => {
      setValue('pfp', '');
      toast({
        title: 'An Unknown Error Occured',
        description: 'Profile Picture Could Not Be Used',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      });
    };

    if (!file) {
      setValue('pfp', '');
      toast({
        title: 'Please select an Image!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      });
      return;
    }

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      try {
        console.log(file);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'socketio-chat-app');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dqfzx9kc8/image/upload',
          {
            method: 'POST',
            body: data
          }
        );

        await response
          .json()
          .then(data => {
            if (!data) {
              error();
            }
          })
          .catch(err => {
            error();
            console.log(err);
          });
      } catch (err) {
        error();
        console.log(err);
      }
    } else {
      setValue('pfp', '');
      toast({
        title: 'Please select an Image!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      });
    }
  };

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
              <Input
                {...(inputProps as InputProps)}
                {...field}
                p={1.5}
                onChange={e => {
                  if (!e.target.files) return;
                  form.handleChange(e);
                  postDetails(
                    (e.target.files[0] as File) || null,
                    form.setFieldValue
                  );
                }}
              />
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
