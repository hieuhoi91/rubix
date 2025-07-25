import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';

import { CmsApi } from '@/api/cms-api';
import { useAppSelector } from '@/app/hooks';
import { AppDispatch } from '@/app/store';
import { ROUTES } from '@/constant';
import {
  fetchTotal,
  selectItemPayment,
  selectOpenPayment,
  selectTotalItemPayment,
  setOpenPayment,
} from '@/features/cart/cartSlice';
import { ReqCreateOrder } from '@/shared/types/authType';

type Props = {
  typePayment: 'one' | 'all';
};

type FormValuesProps = {
  userNameCard: string;
  numberCard: string;
  dateCard: string;
  CVV: string;
};

export const PaymentCart: React.FC<Props> = ({ typePayment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const items = useAppSelector(selectItemPayment);
  const cartItems = useAppSelector((state) => state.cart.cart);

  const totalItemPayment = useAppSelector(selectTotalItemPayment);

  const PaymentSchema = Yup.object().shape({
    userNameCard: Yup.string().required("Please enter cardholder's name"),
    numberCard: Yup.string()
      .required('Please enter card number')
      .matches(/^[0-9]+$/, 'Invalid card number')
      .min(16, 'Invalid card number')
      .max(16, 'Invalid card number'),
    dateCard: Yup.string()
      .required('Please enter expiration date')
      .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid expiry date')
      .test(
        'valid-date',
        'Expiry date cannot be in the past',
        function (value) {
          if (!value) return false;
          const [month, year] = value.split('/');
          const monthNum = Number(month);
          const yearNum = Number(year);
          if (!monthNum || !yearNum) return false;

          const now = new Date();
          const currentMonth = now.getMonth() + 1;
          const currentYear = now.getFullYear();

          if (yearNum < currentYear) return false;
          if (yearNum === currentYear && monthNum < currentMonth) return false;
          return true;
        }
      ),
    CVV: Yup.string()

      .required('Please enter CVV')
      .matches(/^[0-9]+$/, 'Invalid CVV')
      .min(3, 'Invalid CVV')
      .max(3, 'Invalid CVV'),
  });

  const defaultValues: FormValuesProps = {
    userNameCard: '',
    numberCard: '',
    dateCard: '',
    CVV: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = async () => {
    const dataItemReq: ReqCreateOrder[] = [];
    if (typePayment === 'one') {
      dataItemReq.push({
        item_id: items[0].item.id,
        quantity: items[0].quantity,
      });

      try {
        const _ = await CmsApi.createOrder(dataItemReq);
        toast.success('Purchase successfully');
        dispatch(fetchTotal());
        dispatch(setOpenPayment(false));
      } catch (error) {
        if (error.response.status === 401) {
          toast.error('Please login');
          router.push(ROUTES.LOGIN);
        } else {
          toast.error('Purchase failed');
        }
      }
    } else {
      try {
        dataItemReq.push(
          ...cartItems.map((item) => ({
            item_id: item.item.id,
            quantity: item.quantity,
          }))
        );
        const _ = await CmsApi.createOrder(dataItemReq);
        toast.success('Purchase successfully');
        dispatch(fetchTotal());
        dispatch(setOpenPayment(false));
      } catch (error) {
        if (error.response.status === 401) {
          toast.error('Please login');
          router.push(ROUTES.LOGIN);
        } else {
          toast.error('Purchase failed');
        }
      }
    }
    reset();
  };

  const openPayment = useAppSelector(selectOpenPayment);
  const handleClose = () => dispatch(setOpenPayment(false));

  return (
    <Modal opened={openPayment} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-center bg-blue-300 p-2'>
          <div className='flex h-auto flex-col gap-2 rounded-lg bg-white p-3'>
            <p className='text-xl font-semibold'>Payment details</p>
            <div className='input_text relative mt-6'>
              <RHFTextField
                name='userNameCard'
                type='text'
                className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                placeholder='Tên'
              />
              <span className='absolute left-0 -top-5 text-sm'>
                Account name
              </span>
              <i className='fa fa-user absolute left-2 top-4 text-gray-400'></i>
            </div>
            <div className='input_text relative mt-8'>
              <RHFTextField
                name='numberCard'
                type='text'
                className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                placeholder='0000 0000 0000 0000'
              />
              <span className='absolute left-0 -top-5 text-sm'>
                Card number
              </span>
              <i className='fa fa-credit-card absolute left-2 top-[14px] text-sm text-gray-400'></i>
            </div>
            <div className='mt-8 flex gap-5 '>
              <div className='input_text relative w-full'>
                <RHFTextField
                  name='dateCard'
                  type='text'
                  className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                  placeholder='mm/yyyy'
                />
                <span className='absolute left-0 -top-5 text-sm'>Expiry</span>
                <i className='fa fa-calendar-o absolute left-2 top-4 text-gray-400'></i>
              </div>
              <div className='input_text relative w-full'>
                <RHFTextField
                  name='CVV'
                  type='text'
                  className='h-12 w-full border-b px-2 pl-7 outline-none transition-all focus:border-blue-900 '
                  placeholder='000'
                />
                <span className='absolute left-0 -top-4 text-sm'>CVV</span>
                <i className='fa fa-lock absolute left-2 top-4 text-gray-400'></i>
              </div>
            </div>
            {typePayment === 'one' && items[0]?.item ? (
              <p className='mt-10 text-center text-lg font-semibold text-gray-600'>
                Total amount: ${items[0].item.price * items[0].quantity}.00
              </p>
            ) : (
              <p className='mt-10 text-center text-lg font-semibold text-gray-600'>
                Total amount: ${totalItemPayment}.00
              </p>
            )}
            <div className='mt-2 flex justify-center'>
              <Button
                className='pay mb-3 h-12 w-1/2 cursor-pointer rounded-lg bg-orange-600 text-white outline-none transition-all hover:bg-orange-700'
                type='submit'
              >
                Pay
              </Button>
            </div>
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};
