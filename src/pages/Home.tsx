import React, { FC, useEffect } from "react";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import CurrencyConverterCard from "../components/CurrencyConverterCard";
import CurrencyRatesList from "../components/CurrencyRatesList";
import { startDate, endDate } from "../date";
import { currencyHistoricalRates, currencyRate, currencyRates } from "../api";
import {
  currencyValueChangeAction,
  fromCurrencyChangeAction,
  toCurrencyChangeAction,
} from "../features/currencyChangesSlice";

const Home: FC = () => {
  const dispatch = useDispatch();
  const fromCurrency = useSelector(
    (state: RootState) => state.currency.value.fromCurrency
  );
  const toCurrency = useSelector(
    (state: RootState) => state.currency.value.toCurrency
  );
  const currencyValue = useSelector(
    (state: RootState) => state.currency.value.currencyValue
  );
  const currencyResult = useSelector(
    (state: RootState) => state.currency.value.currencyResult
  );
  const fromCurrencyChange = useSelector(
    (state: RootState) => state.currencyChanges.value.fromCurrencyChange
  );
  const toCurrencyChange = useSelector(
    (state: RootState) => state.currencyChanges.value.toCurrencyChange
  );
  const currencyValueChange = useSelector(
    (state: RootState) => state.currencyChanges.value.currencyValueChange
  );

  useEffect(() => {
    dispatch(fromCurrencyChangeAction(fromCurrency));
    dispatch(toCurrencyChangeAction(toCurrency));
    dispatch(currencyValueChangeAction(currencyValue));
    currencyRate({
      fromCurrency,
      toCurrency,
      currencyValue,
    });
    currencyRates("EUR");
    currencyHistoricalRates({
      fromCurrencyChange: "EUR",
      toCurrencyChange: "USD",
      startDate: startDate,
      endDate: endDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <h1 style={{ marginTop: "50px" }}>Currency Exchanger</h1>
      <CurrencyConverterCard
        btnNotDisabled={true}
        fromCurrencyDisabled={false}
      />
      <CurrencyRatesList />
    </div>
  );
};

export default Home;
