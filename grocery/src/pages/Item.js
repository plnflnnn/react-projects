import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllItems, selectAll } from '../features/catalog/itemsSlice';
import { itemAddToCart } from '../features/cart/cartSlice';
import { slugify, titleFromSlug } from '../utils/format';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import NotFoundItems from './NotFoundItems';

export default function Item() {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const { categoryName, itemName } = useParams();
  const dispatch = useDispatch();

  const itemsLoadingStatus = useSelector((state) => state.items.itemsLoadingStatus);
  const items = useSelector(selectAll);
  const cart = useSelector((state) => state.cart.cart);

  const product = items.find(
    (item) => slugify(item.item_name) === itemName && slugify(item.item_category) === categoryName
  );

  useEffect(() => {
    dispatch(fetchAllItems());
    // eslint-disable-next-line
  }, [itemName, categoryName]);

  useEffect(() => {
    setQuantity(1);
    setMessage('');
  }, [itemName, categoryName]);

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timeoutId = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timeoutId);
  }, [message]);

  if (itemsLoadingStatus === 'loading') {
    return <Loading />;
  }

  if (itemsLoadingStatus === 'error') {
    return <ErrorMessage message="We could not load this product." />;
  }

  if (!product) {
    return <NotFoundItems />;
  }

  const alreadyInCart = cart.some((item) => String(item.id) === String(product.id));

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      itemAddToCart({
        item_name: product.item_name,
        item_category: product.item_category,
        item_src: product.item_src,
        item_price: product.item_price,
        id: product.id,
        item_quantity: quantity,
      })
    );
    setMessage(alreadyInCart ? 'Updated quantity in cart' : 'Item added to cart');
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <Link to="/products" className="mr-2 text-sm font-medium text-gray-900">
                  Products
                </Link>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <Link
                to={`/products/${slugify(product.item_category)}`}
                className="mr-2 text-sm font-medium text-gray-500"
              >
                {titleFromSlug(categoryName)}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 max-w-2xl sm:px-6">
          <div className="aspect-h-3 aspect-w-4 sm:overflow-hidden sm:rounded-lg lg:aspect-h-3 lg:aspect-w-4">
            <img
              src={product.item_src}
              alt={product.item_name}
              className="h-2/3 w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.item_name}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">${product.item_price} per pound</p>

            <form className="mt-4" onSubmit={onSubmit}>
              <label htmlFor="item-quantity" className="sr-only">
                Quantity in pounds
              </label>
              <input
                id="item-quantity"
                type="number"
                className="item_quantity"
                name={product.item_name}
                min="1"
                max="100"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value) || 1)}
              />
              <button
                type="submit"
                className="submit mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
            {message ? <p className="mt-2 text-center text-sm">{message}</p> : null}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-100 lg:pb-16 lg:pr-8 lg:pt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-900">
              Fresh {product.item_name.toLowerCase()} from our {product.item_category.toLowerCase()}{' '}
              selection, sold by the pound. Add the amount you need and check out when you are ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
