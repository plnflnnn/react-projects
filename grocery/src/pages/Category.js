import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFilteredItems } from '../features/catalog/itemsSlice';
import { slugify, titleFromSlug } from '../utils/format';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import NotFoundItems from './NotFoundItems';

export default function Category() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const itemsLoadingStatus = useSelector((state) => state.items.filteredItemsLoadingStatus);
  const items = useSelector((state) => state.items.filteredItems);

  useEffect(() => {
    dispatch(fetchFilteredItems(categoryName));
    // eslint-disable-next-line
  }, [categoryName]);

  if (itemsLoadingStatus === 'loading') {
    return <Loading />;
  }

  if (itemsLoadingStatus === 'error') {
    return <ErrorMessage message="We could not load this category." />;
  }

  if (items.length === 0) {
    return <NotFoundItems />;
  }

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">{titleFromSlug(categoryName)}</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {items.map((item) => (
              <div key={item.id} className="group relative mb-5">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-h-1 sm:aspect-w-2 sm:h-64 lg:aspect-h-1 lg:aspect-w-1">
                  <img
                    src={item.item_src}
                    alt={item.item_name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link to={`/products/${slugify(item.item_category)}/${slugify(item.item_name)}`}>
                    <span className="absolute inset-0" />
                    {item.item_name}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">${item.item_price} per pound</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
