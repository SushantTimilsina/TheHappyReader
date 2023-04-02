import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    prev: null,
    next: null,
    product: null,
    products: [],
    loading: false,
    error: "",
    filterProducts: [],
  },

  reducers: {
    productFetching(state) {
      state.loading = true;
      state.error = "";
    },

    productFetched(state, action) {
      state.loading = false;
      state.error = "";
      state.products = action.payload.results;
      state.next = action.payload.next;
      state.prev = action.payload.previous;
    },

    productFetchingFail(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    SingleProductFetch(state, actions) {
      state.loading = false;
      state.error = "";
      state.product = actions.payload;
    },

    resetProduct(state) {
      state.loading = false;
      state.error = "";
    },
    setFilterProducts(state, action: PayloadAction<any>) {
      state.filterProducts = action.payload.data;
      state.next = action.payload.next;
      state.prev = action.payload.previous;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
