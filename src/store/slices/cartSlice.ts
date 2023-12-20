import {
  CancelOrderOptions,
  CartSlice,
  CreateOrderOptions,
} from "@/types/cart";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const cancelOrder = createAsyncThunk(
  "cart/cancelOrder",
  async (options: CancelOrderOptions, thunkApi) => {
    const { orderId, onSuccess, onError } = options;

    try {
      await fetch(`${config.apiBaseUrl}/order/${orderId}`, {
        method: "DELETE",
      });
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  }
);

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async (options: CreateOrderOptions, thunkApi) => {
    const { payload, onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      onSuccess && onSuccess(data);
    } catch (err) {
      onError && onError(err);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearOutCart: (state) => {
      state.items.splice(0, state.items.length);
    },

    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );

      // update quantity if previously added product exists
      if (existingProduct) {
        // existingProduct.quantity += action.payload.quantity;
        state.items = state.items.map((item) =>
          item.id === existingProduct.id
            ? { ...item, quantity: (item.quantity += action.payload.quantity) }
            : item
        );
      }
      // add product if no previously added product do not exist
      else {
        // state.items.push(action.payload);
        state.items = [...state.items, action.payload]; // duplicate existing products in cart and add additional products
      }
    },

    updateQuantity: (state, action) => {
      const quantity = action.payload.quantity;
      // remove from cart
      if (!quantity) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
      // updating increase or decrease quantity
      else {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
    },
  },
});

export const { addToCart, updateQuantity, clearOutCart } = cartSlice.actions;

export default cartSlice.reducer;
