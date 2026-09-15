import { configureStore } from '@reduxjs/toolkit';
import goods from './goodsSlice';
import filters from './filtersSlice';
import bestGoods from './bestGoodsSlice';

const store = configureStore({
    reducer: { goods, filters, bestGoods },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
