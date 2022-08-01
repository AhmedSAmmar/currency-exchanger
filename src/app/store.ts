import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currencySlice";
import currencyRatesReducer from "../features/currencyRatesSlice";
import currencyHistoricalRates from "../features/currencyHistoricalRatesSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    currencyRates: currencyRatesReducer,
    currencyHistoricalRates: currencyHistoricalRates,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
