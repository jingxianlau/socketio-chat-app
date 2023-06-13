import React from 'react';
import FormField from '../misc/FormField';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button } from '@chakra-ui/react';
import * as Yup from 'yup';

export interface FormValues {
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
    actions.setSubmitting(true);

    actions.resetForm();
    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid Email Format'),
    password: Yup.string().required('Required')
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
          <Button
            type='submit'
            w='100%'
            variant='solid'
            colorScheme='teal'
            disabled={formik.isSubmitting}
          >
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
