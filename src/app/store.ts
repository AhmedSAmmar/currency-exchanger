import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currencySlice";
import currencyRatesReducer from "../features/currencyRatesSlice";
import currencyHistoricalRates from "../features/currencyHistoricalRatesSlice";
import currencyChangesReducer from "../features/currencyChangesSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    currencyRates: currencyRatesReducer,
    currencyHistoricalRates: currencyHistoricalRates,
    currencyChanges: currencyChangesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
