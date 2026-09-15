import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { clearCart } from '../features/cart/cartSlice';
import { fetchJson } from '../lib/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function SuccessfulPayment() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState(sessionId ? 'loading' : 'missing');

  useEffect(() => {
    if (!sessionId) {
      return undefined;
    }

    let isMounted = true;

    fetchJson(`/checkout-session/${sessionId}`)
      .then((session) => {
        if (!isMounted) {
          return;
        }

        if (session.status === 'paid' || session.status === 'no_payment_required') {
          dispatch(clearCart());
          setStatus('paid');
          return;
        }

        setStatus('unpaid');
      })
      .catch(() => {
        if (isMounted) {
          setStatus('error');
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [sessionId]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error' || status === 'missing' || status === 'unpaid') {
    return (
      <ErrorMessage message="We could not confirm this payment. If you were charged, please contact support." />
    );
  }

  return (
    <div className="mx-auto h-96 px-4 pb-10 pt-10 text-center">
      <h1 className="mt-10 pt-10 text-2xl font-semibold text-gray-900">Thanks for your order!</h1>
    </div>
  );
}
