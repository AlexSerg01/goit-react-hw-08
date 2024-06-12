import { configureStore } from "@reduxjs/toolkit";

import { filterReduser } from "./filterSlice";
import { contactsReduser } from "./contactsSlice";

export const store = configureStore({
  reducer: {
    items: contactsReduser,
    name: filterReduser,
  },
});
