import { configureStore } from "@reduxjs/toolkit";
import authorSlice from "./author/author-slice";
import cartSlice from "./cart/cart-slice";
import genreSlice from "./genre/genre-slice";
import productSlice from "./products/product-slice";
import userSlice from "./user/user-slice";
import orderSlice from "./order/order-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    author: authorSlice.reducer,
    genre: genreSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;
