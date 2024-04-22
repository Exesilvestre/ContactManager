import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addContactAPI, getContactsAPI } from './contactActions';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const contacts = await getContactsAPI();
  return contacts;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const newContact = await addContactAPI(contact);
  return newContact;
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
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default contactSlice.reducer;