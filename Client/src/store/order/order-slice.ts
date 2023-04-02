import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    total: 0,
    orders: [],
    myOrders: [],
    loading: false,
    error: "",
  },
  reducers: {
    setTotal(state, action: PayloadAction<any>) {
      state.total = action.payload;
    },

    setLoading: (state) => {
      state.loading = true;
    },

    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setOrder(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = "";
      state.orders = action.payload;
    },
    setMyOrder(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = "";
      state.myOrders = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
