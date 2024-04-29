import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addContactAPI, getContactsAPI, getContactByIdAPI } from './contactActions';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const contacts = await getContactsAPI();
  return contacts;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const newContact = await addContactAPI(contact);
  return newContact;
});

export const fetchContactById = createAsyncThunk('contacts/fetchContactById', async (contactId) => {
  const contact = await getContactByIdAPI(contactId);
  return contact;
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchContactById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedContact = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;