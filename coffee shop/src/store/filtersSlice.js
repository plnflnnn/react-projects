import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_BASE, request } from '../services/http';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    countryFilter: 'All',
    searchQuery: ''
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => request(`${API_BASE}/filters`)
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        countryFilterChanged: (state, action) => {
            state.countryFilter = action.payload;
            state.searchQuery = '';
        },
        searchQueryChanged: (state, action) => {
            state.searchQuery = action.payload;
            if (action.payload.trim()) {
                state.countryFilter = 'All';
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.filtersLoadingStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'succeeded';
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadingStatus = 'error';
            });
    }
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { selectAll } = filtersAdapter.getSelectors((state) => state.filters);

export const { countryFilterChanged, searchQueryChanged } = actions;
