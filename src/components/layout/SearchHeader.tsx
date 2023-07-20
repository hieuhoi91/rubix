import { ActionIcon, Input, Popover } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoSend } from 'react-icons/io5';

const SearchHeader = () => {
  const navigate = useRouter();
  const [opened, setOpened] = useState(false);

  const { search } = navigate.query;

  const [searchPro, setSearchPro] = React.useState(search);

  const handleClose = () => {
    setOpened(false);
    navigate.push({
      pathname: '/collections/all',
      query: { search: searchPro },
    });
  };

  return (
    <div>
      <Popover opened={opened} position='bottom-start'>
        <Popover.Target>
          <ActionIcon
            onClick={() => setOpened(!opened)}
            className='text-2xl text-gray-700'
          >
            <BiSearch />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown
          sx={(theme) => ({
            background:
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Input
            id='input-with-icon-adornment'
            placeholder='Search...'
            defaultValue={searchPro}
            onChange={(e) => setSearchPro(e.currentTarget.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === 'Enter' && handleClose()
            }
            rightSection={
              <IoSend onClick={handleClose} className='cursor-pointer' />
            }
          />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};
export default SearchHeader;
