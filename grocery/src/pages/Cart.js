import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

import { fetchJson } from '../lib/api';
import { removeItem, updateQuantity } from '../features/cart/cartSlice';
import { slugify } from '../utils/format';

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = cartItems
    .reduce((sum, item) => sum + Number(item.item_price) * Number(item.item_quantity), 0)
    .toFixed(2);

  const onCheckout = async (event) => {
    event.preventDefault();

    if (!stripePublicKey) {
      navigate('/cancel');
      return;
    }

    setIsCheckingOut(true);

    try {
      const stripe = await loadStripe(stripePublicKey);
      const session = await fetchJson('/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            quantity: Number(item.item_quantity),
          })),
        }),
      });

      if (!stripe || !session?.id) {
        navigate('/cancel');
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        navigate('/cancel');
      }
    } catch {
      navigate('/cancel');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="cart mx-auto max-w-7xl items-center p-6 lg:px-8">
      <h1 className="cart__title">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="mx-auto h-96 pb-10 pt-10 text-center">
          <h2 className="mt-10 pt-10 text-xl font-semibold text-gray-900">Cart is empty</h2>
        </div>
      ) : (
        <form onSubmit={onCheckout} className="cart__form">
          <section aria-labelledby="cart-heading" className="cart__heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your cart
            </h2>
            <ul className="cart__items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart__items_item">
                  <div className="cart__item_img">
                    <img src={item.item_src} alt={item.item_name} className="cart__item_img-img" />
                  </div>
                  <div className="cart__items_info">
                    <div className="cart__items_info-main">
                      <div>
                        <div className="cart__item_name">
                          <h3 className="cart__item_title">
                            <Link
                              to={`/products/${slugify(item.item_category)}/${slugify(item.item_name)}`}
                              className="cart__item_link"
                            >
                              {item.item_name}
                            </Link>
                          </h3>
                        </div>
                        <p className="cart__item_price">${item.item_price}</p>
                      </div>
                      <div className="cart__item_quantity">
                        <label htmlFor={`quantity-${item.id}`} className="cart__item_quantity-label">
                          Pounds
                        </label>
                        <input
                          id={`quantity-${item.id}`}
                          type="number"
                          min="1"
                          max="100"
                          value={item.item_quantity}
                          onChange={(event) =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                value: event.target.value,
                              })
                            )
                          }
                          className="cart__item_quantity-select"
                        />
                        <div className="cart__item_remove">
                          <button
                            onClick={() => dispatch(removeItem(item.id))}
                            type="button"
                            className="btn_remove"
                          >
                            <span className="btn_remove-text">Remove</span>
                            &times;
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="cart__item-availability">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="cart__item-availability-instock"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>In stock</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="summary-heading" className="summary">
            <h2 id="summary-heading" className="summary-heading">
              Order summary
            </h2>
            <div className="summary__price">
              <h3 className="summary__price-title">Order total</h3>
              <p className="summary__price">${totalPrice}</p>
            </div>
            <button
              type="submit"
              disabled={isCheckingOut}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isCheckingOut ? 'Redirecting…' : 'Checkout'}
            </button>
          </section>
        </form>
      )}
    </main>
  );
}
