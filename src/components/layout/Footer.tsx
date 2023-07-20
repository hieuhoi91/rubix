import Link from 'next/link';
import React from 'react';
import {
  BiLogoFacebookSquare,
  BiLogoInstagram,
  BiLogoPinterest,
  BiLogoTwitter,
  BiLogoYoutube,
} from 'react-icons/bi';
import { BsHeadphones } from 'react-icons/bs';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdLocationOn,
} from 'react-icons/md';

import NextImage from '@/components/NextImage';

const infoCompany: string[] = [
  'My Account',
  'Track Your Order',
  'FAQs',
  'Payment Methods',
  'Shipping Guide',
  'Products Support',
  'Gift Card Balance',
];

const moreFromRubix: { label: string; href: string }[] = [
  { label: 'About Rubix', href: 'javascript:void(0)' },
  { label: 'Our Guarantees', href: 'javascript:void(0)' },
  { label: 'Terms and Conditions', href: 'javascript:void(0)' },
  { label: 'Privacy Policy', href: '/policy/return' },
  { label: 'Return Policy', href: '/policy/warranty' },
  { label: 'Delivery & Return', href: '/policy/shipping' },
  { label: 'Sitemap', href: '/us' },
];

interface Iicon {
  href: string;
  icon: React.ReactElement;
}

const icon: Iicon[] = [
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <BiLogoFacebookSquare />,
  },
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <BiLogoTwitter />,
  },
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <BiLogoInstagram />,
  },
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <BiLogoPinterest />,
  },
  {
    href: 'https://www.facebook.com/tranngocthanh.tran.10',
    icon: <BiLogoYoutube />,
  },
];

const Footer = () => {
  const [openIC, setOpenIC] = React.useState(false);
  const [openMFR, setOpenMFR] = React.useState(false);
  const handlerOpenIC = () => {
    setOpenIC(!openIC);
  };
  const handlerOpenMFR = () => {
    setOpenMFR(!openMFR);
  };

  return (
    <footer className='w-full bg-[#1a1a1a] text-white'>
      <div className='flex w-full flex-col px-sm  pt-[70px] pb-10 sm:grid sm:grid-cols-2 md:grid-cols-4 xl:px-xl '>
        <div className='flex flex-col'>
          <Link href='/'>
            <NextImage
              src='/images/logo_white.png'
              width={130}
              height={24}
              alt='Ribix'
              className='w-full pt-[10px] pb-10'
            />
          </Link>
          <div className='flex w-full gap-4'>
            {icon.map((item, idx) => (
              <a
                href={item.href}
                key={idx}
                className='cursor-pointer text-2xl transition-all hover:text-amber-400'
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
        <div className='h-full w-full '>
          <div
            className='flex w-full items-center justify-between '
            onClick={handlerOpenIC}
          >
            <h4 className='mb-[10px] py-[10px] font-medium'>
              Information Company
            </h4>
            <span className='block sm:hidden'>
              {!openIC ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
            </span>
          </div>
          <ul className={!openIC ? 'hidden sm:block' : 'block'}>
            {infoCompany.map((item) => (
              <li
                key={item}
                className='cursor-pointer py-[5px] text-sm text-[#999] hover:text-amber-400 hover:transition-all'
              >
                <a href=''>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className='h-full w-full '>
          <div
            className='flex w-full items-center justify-between sm:block'
            onClick={handlerOpenMFR}
          >
            <h4 className='mb-[10px] py-[10px] font-medium'>More From Rubix</h4>
            <span className='block sm:hidden'>
              {!openMFR ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
            </span>
          </div>
          <ul className={!openMFR ? 'hidden sm:block' : 'block'}>
            {moreFromRubix.map((item) => (
              <li
                key={item.label}
                className='cursor-pointer py-[5px] text-sm text-[#999] hover:text-amber-400 hover:transition-all'
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>
            <h4 className='mb-[10px] py-[10px] font-medium'>Let's Talk</h4>
            <div className='flex items-start gap-3 text-[#999]'>
              <span className='text-2xl'>
                <BsHeadphones />
              </span>
              <div className='cursor-text'>
                +391 (0)35 2568 4593 <br />
                <u>hello@domain.com</u>
              </div>
            </div>
          </div>
          <div>
            <h4 className='mb-[10px] py-[10px] font-medium'>Find Us</h4>
            <div className='flex items-start gap-3 text-[#999]'>
              <span className='text-2xl'>
                <MdLocationOn />
              </span>
              <div className='cursor-text'>
                +391 (0)35 2568 4593 <br />
                <u>hello@domain.com</u>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full items-center justify-between border-t border-[#999] py-8 px-sm text-[#999] xl:px-xl '>
        <div>
          <Link href='/'>
            <b className='text-white'>© 2023 Rubix.</b>
          </Link>{' '}
          All Rights Reserved
        </div>
        <div className='hidden md:block'>
          <NextImage
            src='/images/payment_logo.png'
            width={429}
            height={36}
            alt='Ribix'
            className='h-full w-full'
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
