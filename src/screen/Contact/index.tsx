import React from 'react';

import { Input } from '@/components/common';
import Layout from '@/components/layout/Layout';

import { WithLayout } from '@/shared/types';

interface PropsContact {
  field: string;
  value: string;
}

const data: PropsContact[] = [
  {
    field: 'Add:',
    value: 'No 40 Baria Sreet 133/2, NewYork',
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
  return (
    <div className='flex w-full items-start justify-center'>
      <div className='my-20 flex max-w-[80%] items-start justify-between gap-10'>
        <div className='flex w-1/2 flex-col gap-6'>
          <h3 className='font-semibold'>CONTACT US</h3>
          <p className='text-gray-700'>
            Nor again is there anyone who loves or pursues or desires to obtain
            pain of itself, because it is pain.no annoying consequences.
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
        <form className='flex w-1/2 flex-col gap-2'>
          <Input
            type='text'
            placeholder='Name'
            className='h-12 rounded border-[#e8e8e8] hover:border-amber-400'
          />
          <Input type='text' placeholder='Email' className='rounded' />
          <textarea
            placeholder='Message'
            className='mb-4 h-32 w-full rounded border border-gray-300 pt-4 pl-2 outline-none'
          />
          <button className='h-14 w-full rounded border border-gray-300 transition-all hover:border-amber-400 hover:text-amber-400'>
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
};
Contact.getLayout = (page: any) => <Layout>{page}</Layout>;
export default Contact;
