import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchJson } from '../../lib/api';

const itemsAdapter = createEntityAdapter();

const initialState = itemsAdapter.getInitialState({
  itemsLoadingStatus: 'idle',
  filteredItemsLoadingStatus: 'idle',
  filteredItems: [],
});

export const fetchAllItems = createAsyncThunk(
  'items/fetchAllItems',
  async () => fetchJson('/all')
);

export const fetchFilteredItems = createAsyncThunk(
  'items/fetchFilteredItems',
  async (categorySlug) => fetchJson(`/category/${categorySlug}`)
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, (state) => {
        if (state.ids.length === 0) {
          state.itemsLoadingStatus = 'loading';
        }
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.itemsLoadingStatus = 'idle';
        itemsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAllItems.rejected, (state) => {
        state.itemsLoadingStatus = 'error';
      })
      .addCase(fetchFilteredItems.pending, (state) => {
        state.filteredItemsLoadingStatus = 'loading';
      })
      .addCase(fetchFilteredItems.fulfilled, (state, action) => {
        state.filteredItemsLoadingStatus = 'idle';
        state.filteredItems = action.payload;
      })
      .addCase(fetchFilteredItems.rejected, (state) => {
        state.filteredItemsLoadingStatus = 'error';
      });
  },
});

export const { selectAll } = itemsAdapter.getSelectors((state) => state.items);
export default itemsSlice.reducer;
