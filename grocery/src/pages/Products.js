import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllItems, selectAll } from '../features/catalog/itemsSlice';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ProductCard from '../components/ProductCard';
import NotFoundItems from './NotFoundItems';

export default function Products() {
  const dispatch = useDispatch();
  const itemsLoadingStatus = useSelector((state) => state.items.itemsLoadingStatus);
  const items = useSelector(selectAll);

  useEffect(() => {
    dispatch(fetchAllItems());
    // eslint-disable-next-line
  }, []);

  if (itemsLoadingStatus === 'loading') {
    return <Loading />;
  }

  if (itemsLoadingStatus === 'error') {
    return <ErrorMessage message="We could not load the product catalog." />;
  }

  if (items.length === 0) {
    return <NotFoundItems />;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
