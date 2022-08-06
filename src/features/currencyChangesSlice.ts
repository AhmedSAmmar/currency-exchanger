import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrencyState {
  value: {
    fromCurrencyChange: string;
    toCurrencyChange: string;
    currencyValueChange: string;
  };
}

const initialState: CurrencyState = {
  value: {
    fromCurrencyChange: "",
    toCurrencyChange: "",
    currencyValueChange: "",
  },
};

export const currencyChangesSlice = createSlice({
  name: "currencyChanges",
  initialState,
  reducers: {
    fromCurrencyChangeAction: (state, action: PayloadAction<string>) => {
      state.value.fromCurrencyChange = action.payload;
    },
    toCurrencyChangeAction: (state, action: PayloadAction<string>) => {
      state.value.toCurrencyChange = action.payload;
    },
    currencyValueChangeAction: (state, action: PayloadAction<string>) => {
      state.value.currencyValueChange = action.payload;
    },
  },
});

export const {
  fromCurrencyChangeAction,
  toCurrencyChangeAction,
  currencyValueChangeAction,
} = currencyChangesSlice.actions;

export default currencyChangesSlice.reducer;
