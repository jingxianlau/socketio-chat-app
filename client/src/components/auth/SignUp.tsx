import React, { useState } from 'react';
import FormField from '../misc/FormField';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pfp: string;
}
const SignUp: React.FC = () => {
  const [pfp, setPfp] = useState('');

  const toast = useToast();
  const navigate = useNavigate();

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
  ) => void = async (values, actions) => {
    actions.setSubmitting(true);

    try {
      const res = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          pfp
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await res.json();

      if (res.status === 409) {
        // email conflict
        toast({ title: 'Email already taken', status: 'error' });
      } else if (!res.ok) {
        // error
        toast({ title: 'Error', description: json.err, status: 'error' });
      } else {
        // success
        localStorage.setItem('userInfo', JSON.stringify(json));

        toast({ title: 'Registration Successful!', status: 'success' });

        actions.resetForm();
        setTimeout(() => {
          navigate('/chats');
        }, 500);
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
    name: Yup.string()
      .required('Required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string().required('Required').email('Invalid Email Format'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /(?=.*[a-z])/,
        'Password must have at least one lowercase letter'
      )
      .matches(
        /(?=.*[A-Z])/,
        'Password must have at least one uppercase letter'
      )
      .matches(/(?=.*[0-9])/, 'Password must have at least one digit')
      .matches(
        /(?=.*[^A-Za-z0-9])/,
        'Password must have at least on special character'
      ),
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
            sendValue={val => setPfp(val)}
            formik={formik}
            type='file'
          />
          <Button
            type='submit'
            w='100%'
            variant='solid'
            colorScheme='teal'
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
          >
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
