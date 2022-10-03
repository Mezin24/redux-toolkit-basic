import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
});

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    toggleItem: (state, { payload }) => {
      const { id, type } = payload;
      const tempItem = state.cartItems.find((item) => item.id === id);
      if (type === 'inc') {
        tempItem.amount += 1;
      }
      if (type === 'decr') {
        tempItem.amount -= 1;
        if (tempItem.amount < 1) {
          tempItem.amount = 1;
        }
      }
    },
    removeItem: (state, { payload }) => {
      const tempItems = state.cartItems.filter((item) => item.id !== payload);
      state.cartItems = tempItems;
    },

    calcTotals: (state) => {
      const { total, amount } = state.cartItems.reduce(
        (total, item) => {
          total.total += +item.price * item.amount;
          total.amount += item.amount;

          return total;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, toggleItem, removeItem, calcTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
