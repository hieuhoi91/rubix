import { useFormik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import * as Yup from 'yup';

import { Button, Input } from '@/components/common';
import Layout from '@/components/layout/Layout';

import { ROUTES } from '@/constant';
import { Auth } from '@/screen';
import { Platform } from '@/shared/enum/platform';
import { WithLayout } from '@/shared/types';
import { ReqLogin } from '@/shared/types/authType';

const Login: NextPage & WithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const toggleAuthLogin = () => {
    setIsShowForgotPassword(!isShowForgotPassword);
  };

  const initialValues: ReqLogin = {
    email: '',
    password: '',
    requestFrom: Platform.CMS,
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: async (values) => {
      const reqLogin = {
        email: values.email,
        password: values.password,
        requestFrom: values.requestFrom,
      };
      setIsLoading(true);
      const res = await signIn('credentials', {
        ...reqLogin,
        redirect: false,
      });

      if (res?.error) {
        setIsLoading(false);

        setError(res.error);
        return;
      }

      if (res?.ok) {
        setIsLoading(false);
        router.push(ROUTES.HOME);
      }
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Email not valid.')
        .required('You must enter your email.'),
      password: Yup.string().required('You must enter your password.'),
    }),
  });
  return (
    <div>
      {isShowForgotPassword ? (
        <form
          onSubmit={formik.handleSubmit}
          className='flex w-full flex-col gap-4 pt-4'
        >
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='text-sm text-red-600'>{formik.errors.email}</div>
          ) : null}

          <Input
            id='password'
            name='password'
            placeholder='Mật khẩu'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            eyeEnable={true}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='text-sm text-red-600'>{formik.errors.password}</div>
          ) : null}

          <span
            className='flex w-full items-center justify-between '
            onClick={toggleAuthLogin}
          >
            <Link href='/login' className='text-xs hover:text-amber-400'>
              Forgot password ?
            </Link>
          </span>

          {error && <span className='text-sm text-red-600'>{error}</span>}
          <Button
            type='submit'
            large
            className='rounded-lg bg-[#1a1a1a] text-sm text-white transition-all hover:bg-amber-400 hover:shadow-lg'
            title={`${isLoading ? 'Loading...' : 'Login'}`}
          />
        </form>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <h4 className='p-2'>Reset your password</h4>
          <span className='pb-4'>
            We will send you an email to reset your password.
          </span>
          <form
            onSubmit={formik.handleSubmit}
            className='flex w-full flex-col items-center justify-center pt-4'
          >
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-sm text-red-600'>{formik.errors.email}</div>
            ) : null}

            {/* {error && <span className="text-light-error text-sm pt-2">{error}</span>} */}
            <Button
              type='submit'
              large
              className='my-4 rounded-lg bg-[#1a1a1a] text-sm text-white transition-all hover:bg-amber-400 hover:shadow-lg'
              title='SUBMIT'
            />
            <Button
              onClick={toggleAuthLogin}
              type='submit'
              large
              className='my-4 rounded-lg border border-stone-900 bg-transparent text-sm text-black transition-buttonLogin hover:border-amber-400 hover:text-amber-400 hover:shadow-lg'
              title='Back to login'
            />
          </form>
        </div>
      )}
    </div>
  );
};

Login.getLayout = (page: JSX.Element) => (
  <Layout>
    <Auth>{page}</Auth>
  </Layout>
);

export default Login;
