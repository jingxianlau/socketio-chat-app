import React from 'react';
import FormField from '../misc/FormField';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export interface FormValues {
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const initialValues: FormValues = {
    email: '',
    password: ''
  };

  const onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void = async (values, actions) => {
    actions.setSubmitting(true);

    try {
      const res = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await res.json();

      if (json.err) {
        // error
        toast({ title: json.err, status: 'error' });
      } else {
        // success
        localStorage.setItem('userInfo', JSON.stringify(json));

        toast({
          title: 'Login Successful!',
          status: 'success',
          isClosable: true,
          duration: 1500
        });

        actions.resetForm();
        navigate('/chats');
      }
    } catch (err) {
      // error
      toast({
        title: 'An unknown error has occurred',
        description: String(err),
        status: 'error'
      });
      return;
    }

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
