import { Button, Input } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';
import { MdHighlightOff } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectSubPriceChoose,
  setSubItemChoose,
  setSubPriceChoose,
} from '@/features/products/productSlice';
import { ReqSearchProduct } from '@/shared/types/itemType';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface ProductCategoriesProps {
  handleFilter: (params: ReqSearchProduct) => Promise<void>;
  minPrice: number | null;
  setMinPrice: SetState<number>;
  maxPrice: number | null;
  setMaxPrice: SetState<number>;
}

const FilterPrice: React.FC<ProductCategoriesProps> = ({
  handleFilter,
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const getSubPriceChoose = useAppSelector(selectSubPriceChoose);

  React.useEffect(() => {
    dispatch(setSubItemChoose(id));
  }, [dispatch, id]);

  return (
    <div className='mt-12 w-full border-b pb-10'>
      <div className='flex h-full w-full justify-between'>
        <h4 className='mb-6'>Price</h4>
        {getSubPriceChoose === '' ? null : (
          <span
            className='cursor-pointer text-amber-400'
            onClick={() => dispatch(setSubPriceChoose(''))}
          >
            <MdHighlightOff />
          </span>
        )}
      </div>
      <ul className='flex w-full flex-col gap-4'>
        <li className='flex w-full cursor-pointer items-center gap-4'>
          <Input.Wrapper label='$ FROM'>
            <Input
              type='number'
              value={minPrice || null}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </Input.Wrapper>
          <Input.Wrapper label='$ TO'>
            <Input
              type='number'
              value={maxPrice || null}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </Input.Wrapper>
        </li>
        <li className='w-full'>
          <Button
            variant='default'
            className='w-full border-amber-400 transition-all hover:bg-amber-400 hover:text-white'
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
export default FilterPrice;
