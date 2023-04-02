import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart") || "[]") || [], // getting cart data from local storage if present
    totalQuantity:
      JSON.parse(localStorage.getItem("totalQuantity") || "0") || 0, // getting total quantity data from local storage if present
  },
  reducers: {
    // add to cart reducer
    addTocart(state, actions) {
      const newItem = actions.payload;
      const existingItem = state.cart.find(
        (item: any) => item.id === newItem.id
      );
      state.totalQuantity = state.totalQuantity + newItem.quantity;
      if (!existingItem) {
        state.cart.push({
          photo: newItem.photo,
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
          name: newItem.name,
          itemQuantity: newItem.itemQuantity,
        });
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },

    // remove from cart reducer
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cart.find((item: any) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.cart = state.cart.filter((item: any) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },

    clearCart(state) {
      state.cart = [];
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
