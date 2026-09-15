import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_BASE, request } from '../services/http';

const bestGoodsAdapter = createEntityAdapter();

const initialState = bestGoodsAdapter.getInitialState({
    bestGoodsLoadingStatus: 'idle'
});

const withStringIds = (items) => items.map((item) => ({ ...item, id: String(item.id) }));

export const fetchBestGoods = createAsyncThunk(
    'bestGoods/fetchBestGoods',
    () => request(`${API_BASE}/best`)
);

const bestGoodsSlice = createSlice({
    name: 'bestGoods',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBestGoods.pending, (state) => {
                state.bestGoodsLoadingStatus = 'loading';
            })
            .addCase(fetchBestGoods.fulfilled, (state, action) => {
                state.bestGoodsLoadingStatus = 'succeeded';
                bestGoodsAdapter.setAll(state, withStringIds(action.payload));
            })
            .addCase(fetchBestGoods.rejected, (state) => {
                state.bestGoodsLoadingStatus = 'error';
            });
    }
});

export default bestGoodsSlice.reducer;

export const { selectAll } = bestGoodsAdapter.getSelectors((state) => state.bestGoods);
