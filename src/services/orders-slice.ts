import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchProfileOrders = createAsyncThunk(
  'orders/fetchProfileOrders',
  async () => await getOrdersApi()
);

interface OrdersState {
  orders: TOrder[];
  isLoading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default ordersSlice.reducer;
