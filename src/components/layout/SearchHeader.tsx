import { Input, Popover } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

const SearchHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const navigate = useRouter();

  const { search } = navigate.query;

  const [searchPro, setSearchPro] = React.useState(search);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate.push({
      pathname: '/collections/all',
      query: { search: searchPro },
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      {/* <ActionIcon onClick={handleClick} id={id}>
        <BiSearch />
      </ActionIcon> */}
      <Popover
        id={id}
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //   setSearchPro(e.target.value)
        // }
        opened={open}
        // anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Input
          id='input-with-icon-adornment'
          placeholder='Search...'
          defaultValue={searchPro}
          className='h-14 w-72'
          sx={{
            padding: '0 0.5rem',
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && handleClose()
          }
        />
        {/* <Button aria-label='search' onClick={handleClose}>
          <IoSend />
        </Button> */}
      </Popover>
    </div>
  );
};
export default SearchHeader;
