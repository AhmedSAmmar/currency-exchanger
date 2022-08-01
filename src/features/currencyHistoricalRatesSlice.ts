import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrencyState {
  value: string;
}

const initialState: CurrencyState = {
  value: "",
};

export const currencyHistoricalRatesSlice = createSlice({
  name: "currencyHistoricalRates",
  initialState,
  reducers: {
    currencyHistoricalRatesAction: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { currencyHistoricalRatesAction } =
  currencyHistoricalRatesSlice.actions;

export default currencyHistoricalRatesSlice.reducer;
