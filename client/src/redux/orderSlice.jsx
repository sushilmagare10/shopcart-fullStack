import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethods";

const initialState = {
  orders: [],
  currentOrder: null,
  isFetching: false,
  error: false,
};

export const MakeOrder = createAsyncThunk(
  "orders/createOrder",
  async (order, thunkAPI) => {
    try {
      const response = await userRequest.post("/order/new", order);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(MakeOrder.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(MakeOrder.fulfilled, (state, action) => {
        state.isFetching = false;
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetOrder, createOrder, createOrderFail } = orderSlice.actions;
export default orderSlice.reducer;
