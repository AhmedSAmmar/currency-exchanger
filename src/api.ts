import axios from "axios";
import { store } from "./app/store";
import { currencies } from "./currencies";
import { currencyHistoricalRatesAction } from "./features/currencyHistoricalRatesSlice";
import { currencyRatesAction } from "./features/currencyRatesSlice";
import {
  currencyRateAction,
  currencyResultAction,
  currencyValueAction,
  fromCurrencyAction,
  toCurrencyAction,
} from "./features/currencySlice";

const ApiKey: string = `${process.env.REACT_APP_API_KEY}`;

interface Currency {
  fromCurrency: string;
  toCurrency: string;
  currencyValue: string;
}

export const currencyRate = async ({
  fromCurrency,
  toCurrency,
  currencyValue,
}: Currency) => {
  try {
    const response = await axios({
      url: `https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${currencyValue}`,
      headers: { apikey: ApiKey },
    });
    store.dispatch(currencyRateAction(response.data.info.rate));
    store.dispatch(currencyResultAction(response.data.result));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const currencyRates = async (fromCurrencyChange: string) => {
  try {
    const currencySymbols = currencies.map((currency) => currency.symbol);
    const currencySymbolString = currencySymbols.toString();
    const response = await axios({
      url: `https://api.apilayer.com/fixer/latest?symbols=${currencySymbolString}&base=${fromCurrencyChange}`,
      headers: { apikey: ApiKey },
    });
    store.dispatch(currencyRatesAction(response.data.rates));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

interface CurrencyHistoricalInfo {
  fromCurrencyChange: string;
  toCurrencyChange: string;
  startDate: string;
  endDate: string;
}

export const currencyHistoricalRates = async ({
  fromCurrencyChange,
  toCurrencyChange,
  startDate,
  endDate,
}: CurrencyHistoricalInfo) => {
  try {
    const response = await axios({
      url: `https://api.apilayer.com/fixer/timeseries?start_date=${startDate}&end_date=${endDate}&base=${fromCurrencyChange}&symbol=${toCurrencyChange}`,
      headers: { apikey: ApiKey },
    });
    store.dispatch(currencyHistoricalRatesAction(response.data.rates));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

interface CurrencyResults {
  fromCurrencyChange: string;
  toCurrencyChange: string;
  currencyValueChange: string;
}

export const currencyRateResults = async ({
  fromCurrencyChange,
  toCurrencyChange,
  currencyValueChange,
}: CurrencyResults) => {
  try {
    const response = await axios({
      url: `https://api.apilayer.com/fixer/convert?to=${toCurrencyChange}&from=${fromCurrencyChange}&amount=${currencyValueChange}`,
      headers: { apikey: ApiKey },
    });
    store.dispatch(fromCurrencyAction(fromCurrencyChange));
    store.dispatch(toCurrencyAction(toCurrencyChange));
    store.dispatch(currencyValueAction(currencyValueChange));
    store.dispatch(currencyRateAction(response.data.info.rate));
    store.dispatch(currencyResultAction(response.data.result));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
