import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchProfileOrders = createAsyncThunk(
  'orders/fetchProfileOrders',
  async () => await getOrdersApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
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
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        const hasOrder = state.orders.some(
          (o) => o.number === action.payload.number
        );
        if (!hasOrder) {
          state.orders.push(action.payload);
        }
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default ordersSlice.reducer;
