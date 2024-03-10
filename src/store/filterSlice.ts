import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IFilter } from "../types";

const initialState: IFilter = {};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setPriceInterval: (state, action: PayloadAction<{from:number, to:number}>) => {
      state.price = action.payload;
    },
    setProductName: (state, action: PayloadAction<string>) => {
      state.product = action.payload;
    },
    resetFilter: (state) => {
      state.brand = "";
      delete state.price;
      state.product = "";
    },
  },
});

export const {
  setBrand,
  resetFilter,
  setPriceInterval,
  setProductName,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

export const selectFilter = (state: RootState) => state.filter;
