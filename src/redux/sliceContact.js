import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchAllContactsThunk,
} from './operations';

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

export const sliceContact = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchAllContactsThunk.fulfilled, (state, { payload }) => {
        state.contacts = payload;
        state.loading = false;
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
        state.loading = false;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(item => item.id !== payload.id);
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchAllContactsThunk.pending,
          addContactThunk.pending,
          deleteContactThunk.pending
        ),
        (state, { payload }) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllContactsThunk.rejected,
          addContactThunk.rejected,
          deleteContactThunk.rejected
        ),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export const contactReducer = sliceContact.reducer;

export const { addContact, deleteContact } = sliceContact.actions;
