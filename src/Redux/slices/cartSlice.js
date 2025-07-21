import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
  cart: null,
  loading: false,
  error: null,
  disabledbtn: false,
};

// 🛒 Get logged user's cart
export const getLoggedUserCart = createAsyncThunk('cart/getLoggedUserCart', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Unauthorized");

    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token }
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
  }
});

// ➕ Add product to cart
export const addProductToCart = createAsyncThunk('cart/addProductToCart', async (productId, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Unauthorized");

    const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
      headers: { token }
    });
    toast.success("Product added to cart ✅");
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add product");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

// ❌ Remove product from cart
export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (itemId, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Unauthorized");

    const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
      headers: { token }
    });
    toast.success("Product removed from cart ❌");
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to remove item");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

// 🧹 Clear cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Unauthorized");

    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token }
    });
    toast.success("Cart cleared 🧹");
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to clear cart");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

// 🔄 Update cart item quantity
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, count }, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Unauthorized");

    thunkAPI.dispatch(setDisabledbtn(true));
    const { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
      { count },
      { headers: { token } }
    );
    toast.success("Cart updated 💯");
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update item");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  } finally {
    thunkAPI.dispatch(setDisabledbtn(false));
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = null;
      state.error = null;
      state.loading = false;
      state.disabledbtn = false;
    },
    setDisabledbtn: (state, action) => {
      state.disabledbtn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLoggedUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getLoggedUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  }
});

export const { clearCartState, setDisabledbtn } = cartSlice.actions;

export default cartSlice.reducer;
