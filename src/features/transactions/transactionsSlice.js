import { createSlice } from '@reduxjs/toolkit';

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    entries: [],
  },
  reducers: {
    updateTransactions: (state, action) => {
      state.entries = action.payload;
    },
  },
});

export const { updateTransactions } = transactionsSlice.actions;

export const selectEntries = state => state.transactions.entries;

export default transactionsSlice.reducer;
