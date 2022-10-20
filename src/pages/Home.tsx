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

  const { fromCurrency, toCurrency, currencyValue, currencyResult } =
    useSelector((state: RootState) => state.currency.value);

  const { fromCurrencyChange, toCurrencyChange, currencyValueChange } =
    useSelector((state: RootState) => state.currencyChanges.value);

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
