import { configureStore } from '@reduxjs/toolkit';
import cart from '../features/cart/cartSlice';
import items from '../features/catalog/itemsSlice';

const store = configureStore({
  reducer: { cart, items },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
