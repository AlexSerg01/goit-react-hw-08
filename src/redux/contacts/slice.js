import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import {
  addContact,
  fetchContacts,
  deleteContact,
  updateContact,
  logOut,
} from "./operations";

function errorHandler(state, action) {
  state.error = action.payload;
  toast(`Error: ${action.payload.message}`, {
    style: { backgroundColor: "red" },
  });
}

function loadingHandler(state) {
  state.loading = true;
}

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, loadingHandler)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, errorHandler)
      //
      .addCase(addContact.pending, loadingHandler)
      .addCase(addContact.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.items.push(action.payload);
        toast("Successfully added", { style: { backgroundColor: "green" } });
      })
      .addCase(addContact.rejected, errorHandler)
      //
      .addCase(deleteContact.pending, loadingHandler)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        if (index !== -1) state.items.splice(index, 1);
        toast("Successfully deleted", { style: { backgroundColor: "green" } });
      })
      .addCase(deleteContact.rejected, errorHandler)
      .addCase(updateContact.pending, loadingHandler)
      .addCase(updateContact.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
        toast("Successfully updated", { style: { backgroundColor: "green" } });
      })
      .addCase(updateContact.rejected, errorHandler)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.loading = false;
        toast("Logged out and contacts cleared", {
          style: { backgroundColor: "green" },
        });
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
