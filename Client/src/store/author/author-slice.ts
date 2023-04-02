import { createSlice } from "@reduxjs/toolkit";

const authorSlice = createSlice({
  name: "author",
  initialState: {
    author: [],
    singleAuthorData: null,
    loading: false,
    error: "",
    prev: null,
    next: null,
  },
  reducers: {
    isLoading(state) {
      state.loading = true;
      state.error = "";
    },

    fetchedAuthor(state, actions) {
      state.author = actions.payload.results;
      state.next = actions.payload.next;
      state.prev = actions.payload.previous;
      state.loading = false;
      state.error = "";
    },

    isError(state, actions) {
      state.loading = false;
      state.error = actions.payload;
    },

    customAuthor(state, action) {
      state.author = state.author.filter(
        (author: any) => author._id !== action.payload
      );
      state.loading = false;
      state.error = "";
    },
    fetchSingleAuthor(state, actions) {
      state.singleAuthorData = actions.payload;
    },

    resetAuthor(state) {
      state.loading = false;
      state.error = "";
    },
  },
});

export const authorActions = authorSlice.actions;
export default authorSlice;
