import { Button, Input } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

import { useAppDispatch } from '@/app/hooks';
import { setSubItemChoose } from '@/features/products/productSlice';
import { ReqSearchProduct } from '@/shared/types/itemType';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface ProductCategoriesProps {
  handleFilter: (params: ReqSearchProduct) => Promise<void>;
  minPrice: number;
  setMinPrice: SetState<number>;
  maxPrice: number;
  setMaxPrice: SetState<number>;
}

const FilterPriceRes: React.FC<ProductCategoriesProps> = ({
  handleFilter,
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setSubItemChoose(id));
  }, [dispatch, id]);

  return (
    <div className='mt-12 border-b pb-10 lg:hidden'>
      <ul className='flex w-full gap-4'>
        <li className='flex w-56 cursor-pointer items-center gap-4'>
          <Input.Wrapper label='$ FROM'>
            <Input
              sx={{ height: '100%' }}
              type='number'
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </Input.Wrapper>
          <Input.Wrapper label='$ TO'>
            <Input
              sx={{ height: '100%' }}
              type='number'
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </Input.Wrapper>
        </li>
        <li className='h-14 w-10'>
          <Button
            sx={{ height: '100%' }}
            variant='outlined'
            onClick={() =>
              handleFilter({
                page: 1,
                take: 12,
                cates_slug: 'all',
                start_price: minPrice,
                end_price: maxPrice,
              } as ReqSearchProduct)
            }
          >
            Filter
          </Button>
        </li>
      </ul>
    </div>
  );
};
export default FilterPriceRes;
