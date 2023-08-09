import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Input } from '@/components/common';
import Layout from '@/components/layout/Layout';

import { CmsApi } from '@/api/cms-api';
import { WithLayout } from '@/shared/types';

interface PropsContact {
  field: string;
  value: string;
}

const data: PropsContact[] = [
  {
    field: 'Add:',
    value: '113 Dong Bac, Tan Chanh Hiep, District 12, TP.HCM',
  },
  {
    field: 'Phone:',
    value: '+1 800 1236879',
  },
  {
    field: 'Email:',
    value: 'hieuhoi912002@gmail.com',
  },
  {
    field: 'Open:',
    value: 'Mon - Fri: 8:00 - 18:00',
  },
];

const Contact: WithLayout = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      message: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const text = `Username: ${values.name} \n Email: ${values.email} \n Message: ${values.message}`;
        const _ = await CmsApi.sendMail(text);
        toast.success('Send mail success');
      } catch (error) {
        console.log(error);
      }

      resetForm();
    },
  });

  return (
    <div>
      <iframe
        className='h-[600px] w-full'
        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9462.662769091721!2d106.6275687!3d10.857961!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a1fc161b16d%3A0x7b1555dd7b5e0080!2zMTEzIMSQw7RuZyBC4bqvYywgVMOibiBDaMOhbmggSGnhu4dwLCBRdeG6rW4gMTIsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e1!3m2!1svi!2s!4v1678776280323!5m2!1svi!2s'
        width='600'
        height='450'
        loading='lazy'
        allowFullScreen
      ></iframe>
      <div className='flex w-full items-start justify-center'>
        <div className='my-20 flex max-w-[80%] items-start justify-between gap-10'>
          <div className='flex w-1/2 flex-col gap-6'>
            <h3 className='font-semibold'>CONTACT US</h3>
            <p className='text-gray-700'>
              Nor again is there anyone who loves or pursues or desires to
              obtain pain of itself, because it is pain.no annoying
              consequences.
            </p>
            <div className='flex flex-col gap-2 text-gray-700'>
              {data.map((item) => (
                <div key={item.field}>
                  <strong className='text pr-2'>{item.field}</strong>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className='flex w-1/2 flex-col gap-4'
          >
            <Input
              type='text'
              name='name'
              placeholder='Name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-sm text-red-600'>{formik.errors.name}</div>
            ) : null}
            <Input
              type='text'
              name='email'
              placeholder='Email'
              className='rounded'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-sm text-red-600'>{formik.errors.email}</div>
            ) : null}
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              name='message'
              placeholder='Message'
              className='mb-4 h-32 w-full rounded border border-gray-300 pt-4 pl-2 outline-none'
            />
            {formik.touched.message && formik.errors.message ? (
              <div className='text-sm text-red-600'>
                {formik.errors.message}
              </div>
            ) : null}
            <button
              type='submit'
              className='h-14 w-full rounded border border-gray-300 transition-all hover:border-amber-400 hover:text-amber-400'
            >
              <span>SEND MESSAGE</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
Contact.getLayout = (page) => <Layout>{page}</Layout>;
export default Contact;
