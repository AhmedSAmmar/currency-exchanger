import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrencyState {
  value: string;
}

const initialState: CurrencyState = {
  value: "",
};

export const currencyRatesSlice = createSlice({
  name: "currencyRate",
  initialState,
  reducers: {
    currencyRatesAction: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { currencyRatesAction } = currencyRatesSlice.actions;

export default currencyRatesSlice.reducer;
