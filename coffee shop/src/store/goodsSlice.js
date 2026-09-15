import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { API_BASE, request } from '../services/http';

const goodsAdapter = createEntityAdapter();

const initialState = goodsAdapter.getInitialState({
    goodsLoadingStatus: 'idle'
});

const withStringIds = (items) => items.map((item) => ({ ...item, id: String(item.id) }));

export const fetchGoods = createAsyncThunk(
    'goods/fetchGoods',
    () => request(`${API_BASE}/coffee`)
);

const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.pending, (state) => {
                state.goodsLoadingStatus = 'loading';
            })
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.goodsLoadingStatus = 'succeeded';
                goodsAdapter.setAll(state, withStringIds(action.payload));
            })
            .addCase(fetchGoods.rejected, (state) => {
                state.goodsLoadingStatus = 'error';
            });
    }
});

export default goodsSlice.reducer;

export const { selectAll, selectById } = goodsAdapter.getSelectors((state) => state.goods);

export const filteredGoodsSelector = createSelector(
    (state) => state.filters.countryFilter,
    (state) => state.filters.searchQuery,
    selectAll,
    (countryFilter, searchQuery, goods) => {
        const query = searchQuery.trim().toLowerCase();

        return goods.filter((item) => {
            const matchesCountry = countryFilter === 'All' || item.country === countryFilter;
            const matchesSearch = !query || item.name.toLowerCase().includes(query);
            return matchesCountry && matchesSearch;
        });
    }
);
