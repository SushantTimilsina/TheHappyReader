import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genre: [],
    singleGenreData: null,
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

    fetchedGenre(state, actions) {
      state.genre = actions.payload.results;
      state.next = actions.payload.next;
      state.prev = actions.payload.previous;
      state.loading = false;
      state.error = "";
    },

    isError(state, actions) {
      state.loading = false;
      state.error = actions.payload;
    },

    customGenre(state, action) {
      state.genre = state.genre.filter(
        (genre: any) => genre._id !== action.payload
      );
      state.loading = false;
      state.error = "";
    },
    fetchSingleGenre(state, actions) {
      state.singleGenreData = actions.payload;
    },

    resetGenre(state) {
      state.loading = false;
      state.error = "";
    },
  },
});

export const genreActions = genreSlice.actions;
export default genreSlice;
