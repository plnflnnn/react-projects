import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StoreLayout from '../layouts/StoreLayout';
import Loading from '../components/Loading';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const Products = lazy(() => import('../pages/Products'));
const Item = lazy(() => import('../pages/Item'));
const Category = lazy(() => import('../pages/Category'));
const Cart = lazy(() => import('../pages/Cart'));
const Success = lazy(() => import('../pages/SuccessfulPayment'));
const Cancel = lazy(() => import('../pages/Cancel'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<StoreLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:categoryName" element={<Category />} />
            <Route path="/products/:categoryName/:itemName" element={<Item />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
