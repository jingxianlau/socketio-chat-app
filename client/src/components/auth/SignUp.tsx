import React from 'react';
import FormField from './FormField';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button } from '@chakra-ui/react';
import * as Yup from 'yup';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pfp: string;
}
const SignUp: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pfp: ''
  };

  const onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void = (values, actions) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required('Required').email('Invalid Email Format'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
      ),
    confirmPassword: Yup.string().required('Required'),
    pfp: Yup.string()
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          <FormField
            label='Name'
            name='name'
            placeholder='Enter Your Name'
            type='text'
          />
          <FormField
            label='Email'
            name='email'
            placeholder='Enter Your Email'
            type='email'
          />
          <FormField
            label='Password'
            name='password'
            placeholder='Enter Your Password'
            type='password'
          />
          <FormField
            label='Confirm Password'
            name='confirmPassword'
            placeholder='Enter Your Password Again'
            type='password'
          />
          <FormField label='Profile Picture' name='pfp' type='file' />
          <Button type='submit' w='100%' variant='solid' colorScheme='teal'>
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
