import React from 'react';
import FormField from './FormField';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button } from '@chakra-ui/react';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const initialValues: FormValues = {
    email: '',
    password: ''
  };

  const onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void = (values, actions) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid Email Format'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
      )
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          {/* <FormField
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
          <Button type='submit' w='100%' variant='solid' colorScheme='teal'>
            Login
          </Button> */}
        </Form>
      )}
    </Formik>
  );
};

export default Login;
