import { Button, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { MdAdd, MdOutlineLocalGroceryStore, MdRemove } from 'react-icons/md';
import { toast } from 'react-toastify';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Skeleton from '@/components/Skeleton';

import { CmsApi } from '@/api/cms-api';
import { useAppDispatch } from '@/app/hooks';
import { ROUTES } from '@/constant';
import { fetchTotal } from '@/features/cart/cartSlice';
import ButtonCart from '@/screen/Cart/ButtonCart';
import CommentDetail from '@/screen/ProductDetail/CommentDetail';
import { WithLayout } from '@/shared/types';
import { ReqCartItem } from '@/shared/types/cartType';
import { Product } from '@/shared/types/productType';

const ProductDetail: WithLayout = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { id } = router.query;
  const [item, setItemDetail] = React.useState<Product>();
  const [quantityItem, setQuantityItem] = React.useState(1);

  const theme = useMantineTheme();
  const md = useMediaQuery(theme.breakpoints.md);

  const handleAddToCart = async ({ itemId, quantity }: ReqCartItem) => {
    const items: ReqCartItem[] = [];
    items.push({ itemId, quantity });

    try {
      const _ = await CmsApi.addToCart(items);
      dispatch(fetchTotal());
      toast.success('Add to cart successfully');
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('Please login to continue');
        router.push(ROUTES.LOGIN);
      } else {
        toast.error('Error adding to cart');
      }
    }
  };

  React.useEffect(() => {
    const fetchItemDetail = async () => {
      const response = await CmsApi.getDetailItem(id.toString());
      setItemDetail(response.data);
    };
    fetchItemDetail();
  }, [id]);

  return (
    <div className='w-full'>
      {item ? (
        <div className='flex w-full flex-col items-center justify-center sm:mb-10 sm:px-10 lg:mb-2 lg:px-64'>
          <div className='flex w-full justify-center gap-2'>
            <div className='flex-2 flex'>
              <NextImage
                width={md ? 300 : 400}
                height={md ? 300 : 400}
                src={item.images[0] || item.images[1]}
                alt='Products'
              />
            </div>
            <div className='flex flex-1 flex-col gap-6 font-sans'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='md:text-lg lg:text-2xl'>
                    {item?.name || ''}
                  </span>
                </div>
                <div className='flex h-14 w-auto items-start gap-2'>
                  <span
                    className={`${
                      item.price ? 'mt-2 line-through' : null
                    } text-base font-light text-gray-700`}
                  >
                    ₫{item.cost}.00
                  </span>
                  {item.price && (
                    <span className='mt-2 text-3xl font-light text-red-700'>
                      ${item.price}.00
                    </span>
                  )}
                  {item.price < item.cost && (
                    <span className='mt-2 bg-red-500 p-1 text-xs font-bold text-white'>
                      {(((item.cost - item.price) / item.cost) * 100).toFixed(
                        2
                      )}
                      % SALE
                    </span>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='font-medium md:text-base lg:text-xl'>
                  Description:
                </span>
                <span className='md:text-sm lg:text-xl'>
                  {item?.description || ''}
                </span>
              </div>
              <div className='flex gap-4'>
                <span className='mt-2'>Quantity</span>
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    <ButtonCart
                      disabled={quantityItem === 1}
                      onClick={() => setQuantityItem(quantityItem - 1)}
                    >
                      <MdRemove />
                    </ButtonCart>
                    <ButtonCart title={String(quantityItem)} />
                    <ButtonCart
                      onClick={() => setQuantityItem(quantityItem + 1)}
                    >
                      <MdAdd />
                    </ButtonCart>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  variant='default'
                  color='primary'
                  size='medium'
                  className='h-12 w-60 text-base'
                  onClick={() =>
                    handleAddToCart({ itemId: item.id, quantity: quantityItem })
                  }
                >
                  <MdOutlineLocalGroceryStore />
                  <span className='ml-2'>Add to cart</span>
                </Button>
              </div>
            </div>
          </div>
          <CommentDetail />
        </div>
      ) : (
        <div>
          <div className='grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4'>
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className='flex h-full w-full flex-col gap-6'
                >
                  <div className='h-80 bg-gray-200'></div>
                  <div className='h-6 w-1/2 bg-gray-200'></div>
                  <div className='h-6 w-full bg-gray-200'></div>
                </Skeleton>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetail;

ProductDetail.getLayout = (page) => <Layout>{page}</Layout>;
