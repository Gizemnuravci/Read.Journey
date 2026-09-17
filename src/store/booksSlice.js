import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    recommended: [],
    ownBooks: [],
    activeBook: null,
    totalPages: 1,
    page: 1,
  },
  reducers: {
    setRecommended: (state, action) => {
      state.recommended = action.payload.results;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
    },
    setOwnBooks: (state, action) => {
      state.ownBooks = action.payload;
    },
    setActiveBook: (state, action) => {
      state.activeBook = action.payload;
    },
  },
});

export const { setRecommended, setOwnBooks, setActiveBook } =
  booksSlice.actions;
export default booksSlice.reducer;
