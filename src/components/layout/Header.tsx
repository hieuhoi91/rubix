import {
  ActionIcon,
  Button,
  Drawer,
  Indicator,
  Menu,
  Popover,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import {
  MdDeliveryDining,
  MdOutlineLocalMall,
  MdOutlineLogout,
  MdPersonOutline,
} from 'react-icons/md';

import SearchHeader from '@/components/layout/SearchHeader';
import NextImage from '@/components/NextImage';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ROUTES } from '@/constant';
import { login, register } from '@/features/auth/authSlice';
import { fetchTotal } from '@/features/cart/cartSlice';

const links = [
  { href: '/', label: 'Home' },
  { href: '/collections/all', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/blogs', label: 'Blog' },
  { href: '/us', label: 'Contact Us' },
];

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedUser, setOpenedUser] = useState(false);
  const dispatch = useAppDispatch();
  const {
    data: session,
  }: {
    data: any;
  } = useSession();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchTotal());
  }, [dispatch]);

  const total = useAppSelector((state) => state.cart.total);

  const navigate = useRouter();

  const handleNavigate = (href: string) => {
    close();
    navigate.push(href);
  };

  return (
    <header className='sticky top-0 z-40 flex h-24 w-full min-w-[90%] items-center justify-around bg-white py-5 font-normal sm:px-sm lg:justify-between xl:px-xl'>
      <div className='flex gap-4 lg:hidden'>
        <ActionIcon onClick={open} className='text-2xl'>
          <AiOutlineMenu className='cursor-pointer' />
        </ActionIcon>
        <SearchHeader />
      </div>
      <Link href='/'>
        <NextImage
          src='/images/logo_black.png'
          width={130}
          height={24}
          alt='Ribix'
        />
      </Link>
      <div className='hidden min-w-[600px] items-center justify-evenly gap-10 lg:flex'>
        {links.map(({ href, label }) => (
          <li className='list-none' key={`${href}${label}`}>
            <Link href={href} className=' flex hover:text-yellow-300'>
              <span className='w-full'>{label}</span>
            </Link>
          </li>
        ))}
      </div>
      <Drawer
        position='left'
        opened={opened}
        onClose={close}
        className='relative'
        color='white'
      >
        <Link href='/'>
          <NextImage
            src='/images/logo_black.png'
            width={130}
            height={24}
            alt='Ribix'
            className='mx-auto mt-12'
          />
        </Link>
        <Menu shadow='md' width={200}>
          {links.map(({ href, label }) => (
            <Menu.Item
              key={`${href}${label}`}
              onClick={() => handleNavigate(href)}
              className='flex p-3 hover:text-yellow-300'
            >
              <Link href={href}>
                <span className='w-full'>{label}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
      <div className='relative flex items-center justify-end'>
        {session && (
          <div className='hover:text-yellow-300'>
            <Popover opened={openedUser} withArrow>
              <Popover.Target>
                <ActionIcon
                  onClick={() => setOpenedUser(!openedUser)}
                  className='text-2xl'
                >
                  <MdPersonOutline />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <div className='flex flex-col gap-4'>
                  <Button
                    className='text-gray-500 hover:bg-white hover:text-amber-400'
                    size='baseline'
                    onClick={() => {
                      setOpenedUser(false);
                      router.push(ROUTES.ORDER);
                    }}
                  >
                    <span className='text-2xl'>
                      <MdDeliveryDining />
                    </span>
                    <span>Order</span>
                  </Button>
                  <Button
                    size='baseline'
                    className='text-gray-500 hover:bg-white hover:text-amber-400'
                    onClick={() => signOut()}
                  >
                    <span className='text-2xl'>
                      <MdOutlineLogout />
                    </span>
                    <span>Log Out</span>
                  </Button>
                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
        )}
        {!session ? (
          <ul className='flex min-w-[170px] items-center justify-center'>
            <li className='pr-1 hover:text-yellow-300 xl:block'>
              <Link onClick={() => dispatch(login())} href='/login'>
                Login
              </Link>
            </li>
            <li className=' xl:block'>/</li>
            <li className=' pl-1 pr-6 hover:text-yellow-300 xl:block'>
              <Link onClick={() => dispatch(register())} href='/signup'>
                Register
              </Link>
            </li>
          </ul>
        ) : (
          <div className='flex items-end justify-center'>
            <span>{session.token.user.username}</span>
            <div className='hidden cursor-pointer px-2 hover:text-yellow-300 lg:block'>
              <SearchHeader />
            </div>
          </div>
        )}
        {session && (
          <Link href='/cart'>
            <Indicator
              size={16}
              color='red'
              withBorder
              title='Cart'
              className='relative cursor-pointer pl-2'
              label={total}
            >
              <span className='text-2xl'>
                <MdOutlineLocalMall />
              </span>
            </Indicator>
          </Link>
        )}
      </div>
    </header>
  );
}
