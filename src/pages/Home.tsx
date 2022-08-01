import React, { FC, useEffect } from "react";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import CurrencyConverterCard from "../components/CurrencyConverterCard";
import axios from "axios";
import {
  currencyRateAction,
  currencyResultAction,
} from "../features/currencySlice";
import { currencyRatesAction } from "../features/currencyRatesSlice";
import { currencyHistoricalRatesAction } from "../features/currencyHistoricalRatesSlice";
import CurrencyRatesList from "../components/CurrencyRatesList";
import { startDate, endDate } from "../date";

const ApiKey: string = `${process.env.REACT_APP_API_KEY}`;
const currencies: Array<string> = [
  "EUR",
  "USD",
  "EGP",
  "AED",
  "CAD",
  "HKD",
  "SAR",
  "KWD",
  "JPY",
];

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

  interface Currency {
    fromCurrency: string;
    toCurrency: string;
    currencyValue: string;
  }

  const currencyRate = async ({
    fromCurrency,
    toCurrency,
    currencyValue,
  }: Currency) => {
    try {
      const response = await axios({
        url: `https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${currencyValue}`,
        headers: { apikey: ApiKey },
      });
      dispatch(currencyRateAction(response.data.info.rate));
      dispatch(currencyResultAction(response.data.result));
    } catch (error) {
      console.error(error);
    }
  };

  const currencyRates = async (fromCurrency: string) => {
    try {
      const currencyString = currencies.toString();
      const response = await axios({
        url: `https://api.apilayer.com/fixer/latest?symbols=${currencyString}&base=${fromCurrency}`,
        headers: { apikey: ApiKey },
      });
      dispatch(currencyRatesAction(response.data.rates));
    } catch (error) {
      console.error(error);
    }
  };

  interface CurrencyHistoricalInfo {
    fromCurrency: string;
    toCurrency: string;
    startDate: string;
    endDate: string;
  }

  const currencyHistoricalRates = async ({
    fromCurrency,
    toCurrency,
    startDate,
    endDate,
  }: CurrencyHistoricalInfo) => {
    try {
      const response = await axios({
        url: `https://api.apilayer.com/fixer/timeseries?start_date=${startDate}&end_date=${endDate}&base=${fromCurrency}&symbol=${toCurrency}`,
        headers: { apikey: ApiKey },
      });
      dispatch(currencyHistoricalRatesAction(response.data.rates));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    currencyRate({ fromCurrency, toCurrency, currencyValue });
    currencyRates(fromCurrency);
    currencyHistoricalRates({ fromCurrency, toCurrency, startDate, endDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <h1 style={{ marginTop: "50px" }}>Currency Exchanger</h1>
      <CurrencyConverterCard currencies={currencies} btnNotDisabled={true} />
      <CurrencyRatesList />
    </div>
  );
};

export default Home;
