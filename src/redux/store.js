import { configureStore } from '@reduxjs/toolkit';
import { sliceContact } from './sliceContact';
import { sliceFilter } from './sliseFilter';

const store = configureStore({
  reducer: {
    contacts: sliceContact.reducer,
    filter: sliceFilter.reducer,
  },
});

export default store;
