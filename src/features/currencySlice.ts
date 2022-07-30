import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrencyState {
  value: {
    fromCurrency: string;
    toCurrency: string;
    currencyValue: number;
  };
}

const initialState: CurrencyState = {
  value: {
    fromCurrency: "EUR",
    toCurrency: "USD",
    currencyValue: 1,
  },
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    fromCurrency: (state, action: PayloadAction<string>) => {
      state.value.fromCurrency = action.payload;
    },
    toCurrency: (state, action: PayloadAction<string>) => {
      state.value.toCurrency = action.payload;
    },
    currencyValue: (state, action: PayloadAction<number>) => {
      state.value.currencyValue = action.payload;
    },
  },
});

export const { fromCurrency, toCurrency, currencyValue } =
  currencySlice.actions;

export default currencySlice.reducer;
