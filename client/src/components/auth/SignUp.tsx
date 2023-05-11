import React from 'react';
import FormField from './FormField';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button } from '@chakra-ui/react';
import * as Yup from 'yup';

export interface FormValues {
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
    actions.setSubmitting(true);
    console.log(values);
    actions.resetForm();
    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string().required('Required').email('Invalid Email Format'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
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
            formik={formik}
            placeholder='Enter Your Name'
            type='text'
          />
          <FormField
            label='Email'
            name='email'
            formik={formik}
            placeholder='Enter Your Email'
            type='email'
          />
          <FormField
            label='Password'
            name='password'
            formik={formik}
            placeholder='Enter Your Password'
            type='password'
          />
          <FormField
            label='Confirm Password'
            name='confirmPassword'
            formik={formik}
            placeholder='Enter Your Password Again'
            type='password'
          />
          <FormField
            label='Profile Picture'
            name='pfp'
            formik={formik}
            type='file'
          />
          <Button
            type='submit'
            w='100%'
            variant='solid'
            colorScheme='teal'
            disabled={formik.isSubmitting}
          >
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
