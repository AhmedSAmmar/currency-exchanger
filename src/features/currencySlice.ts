import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrencyState {
  value: {
    fromCurrency: string;
    toCurrency: string;
    currencyValue: string;
    currencyResult: string;
    currencyRate: string;
  };
}

const initialState: CurrencyState = {
  value: {
    fromCurrency: "EUR",
    toCurrency: "USD",
    currencyValue: "1",
    currencyResult: "",
    currencyRate: "",
  },
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    fromCurrencyAction: (state, action: PayloadAction<string>) => {
      state.value.fromCurrency = action.payload;
    },
    toCurrencyAction: (state, action: PayloadAction<string>) => {
      state.value.toCurrency = action.payload;
    },
    currencyValueAction: (state, action: PayloadAction<string>) => {
      state.value.currencyValue = action.payload;
    },
    currencyResultAction: (state, action: PayloadAction<string>) => {
      state.value.currencyResult = action.payload;
    },
    currencyRateAction: (state, action: PayloadAction<string>) => {
      state.value.currencyRate = action.payload;
    },
  },
});

export const {
  fromCurrencyAction,
  toCurrencyAction,
  currencyValueAction,
  currencyResultAction,
  currencyRateAction,
} = currencySlice.actions;

export default currencySlice.reducer;
