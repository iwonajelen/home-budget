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
    addTransaction: (state, action) => {
      state.entries.push(action.payload);
    },
    removeTransaction: (state, action) => {
      if(action.payload !== -1) {
        state.entries.splice(action.payload, 1);
      }
    },
    editTransaction: (state, action) => {
      state.entries[action.payload.index] = {...action.payload.transaction};
    }
  },
});

export const { updateTransactions, addTransaction, editTransaction, removeTransaction } = transactionsSlice.actions;

export const selectEntries = state => state.transactions.entries;

export const selectCategoryList = state => {
  return state.transactions.entries.map(e => e.category).filter((v, i, a) => a.indexOf(v) === i);
}

export default transactionsSlice.reducer;
