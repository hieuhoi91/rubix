import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Badge,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';

import NextImage from '@/components/NextImage';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, register } from '@/features/auth/authSlice';
import { fetchTotal } from '@/features/cart/cartSlice';

const links = [
  { href: '/', label: 'Home' },
  { href: '/collections/all', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/us', label: 'Contact Us' },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [openDr, setOpenDr] = React.useState(false);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenDr(true);
  };

  const handleDrawerClose = () => {
    setOpenDr(false);
  };

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    dispatch(fetchTotal());
  }, [dispatch]);

  const total = useAppSelector((state) => state.cart.total);

  const navigate = useRouter();

  const handleNavigate = (href: string) => {
    setOpenDr(false);
    navigate.push(href);
  };

  return (
    <header className='sticky top-0 z-40 flex h-24 w-full min-w-[90%] items-center justify-around bg-white  py-5 font-normal sm:px-sm lg:justify-between xl:px-xl'>
      <div className='flex gap-4 lg:hidden'>
        <IconButton onClick={handleDrawerOpen}>
          <MenuIcon className='cursor-pointer' />
        </IconButton>
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
      </div>
      <Link href='/'>
        <NextImage
          src='/images/logo_black.png'
          width={130}
          height={24}
          alt='Ribix'
        />
      </Link>
      <MenuList className=' hidden min-w-[600px] items-center justify-evenly gap-10 lg:flex'>
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link href={href} className=' flex hover:text-yellow-300'>
              <span className='w-full'>{label}</span>
            </Link>
          </li>
        ))}
      </MenuList>
      <Drawer
        anchor='left'
        open={openDr}
        onClose={handleDrawerClose}
        className='relative'
      >
        <IconButton
          onClick={handleDrawerClose}
          className='absolute right-1 m-2 cursor-pointer'
        >
          <RiCloseCircleFill />
        </IconButton>
        <Link href='/'>
          <NextImage
            src='/images/logo_black.png'
            width={130}
            height={24}
            alt='Ribix'
            className='mx-auto mt-12'
          />
        </Link>
        <MenuList className=' m-6 mt-10 min-w-[300px] flex-col items-center justify-center gap-10'>
          {links.map(({ href, label }) => (
            <MenuItem
              key={`${href}${label}`}
              onClick={() => handleNavigate(href)}
              className='flex hover:text-yellow-300'
            >
              <Link href={href}>
                <span className='w-full'>{label}</span>
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      </Drawer>
      <div className='relative flex items-center justify-end'>
        {session && (
          <div className='hover:text-yellow-300'>
            <IconButton onClick={handlePopoverOpen}>
              <PersonOutlinedIcon />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <div className='flex flex-col items-center justify-center gap-2 p-4'>
                <Button size='small' onClick={() => signOut()}>
                  Đăng xuất
                </Button>
              </div>
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
                Sign up
              </Link>
            </li>
            <li>|</li>
          </ul>
        ) : (
          <div>{session.user.username}</div>
        )}
        <div className='hidden cursor-pointer px-2 hover:text-yellow-300 lg:block'>
          <SearchOutlinedIcon />
        </div>
        <span className='hidden lg:block'>|</span>
        {session && (
          <Link href='/cart'>
            <Badge
              title='Giỏ hàng'
              className='relative cursor-pointer pl-2'
              badgeContent={total}
            >
              <IconButton>
                <LocalMallOutlinedIcon />
              </IconButton>
            </Badge>
          </Link>
        )}
      </div>
    </header>
  );
}
