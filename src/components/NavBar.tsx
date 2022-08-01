import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import "./NavBar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  fromCurrencyAction,
  toCurrencyAction,
  currencyValueAction,
  currencyResultAction,
  currencyRateAction,
} from "../features/currencySlice";
import { useDispatch } from "react-redux";
import { currencyRatesAction } from "../features/currencyRatesSlice";
import { currencyHistoricalRatesAction } from "../features/currencyHistoricalRatesSlice";
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
const NavBar: FC = () => {
  const dispatch = useDispatch();

  interface Currency {
    fromRequestedCurrency: string;
    toRequestedCurrency: string;
    amount: string;
  }

  const currencyRateResults = async ({
    fromRequestedCurrency,
    toRequestedCurrency,
    amount,
  }: Currency) => {
    try {
      const response = await axios({
        url: `https://api.apilayer.com/fixer/convert?to=${toRequestedCurrency}&from=${fromRequestedCurrency}&amount=${amount}`,
        headers: { apikey: ApiKey },
      });
      console.log(typeof response.data.result);
      console.log(response.data.result);
      dispatch(fromCurrencyAction(fromRequestedCurrency));
      dispatch(toCurrencyAction(toRequestedCurrency));
      dispatch(currencyValueAction(amount));
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
      console.log(response.data.rates);
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
      console.log(response.data);
      dispatch(currencyHistoricalRatesAction(response.data.rates));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEurUsdClick = () => {
    currencyRateResults({
      fromRequestedCurrency: "EUR",
      toRequestedCurrency: "USD",
      amount: "1",
    });

    currencyRates("EUR");

    currencyHistoricalRates({
      fromCurrency: "EUR",
      toCurrency: "USD",
      startDate: startDate,
      endDate: endDate,
    });
  };

  const handleEurGbpClick = () => {
    currencyRateResults({
      fromRequestedCurrency: "EUR",
      toRequestedCurrency: "GBP",
      amount: "1",
    });
  };
  return (
    <div className="navbar">
      <div className="nav-icon">
        <FontAwesomeIcon
          className="navIcon"
          icon={faCoins}
          size="2x"
          color="#3D3C42"
        />
      </div>

      <div className="nav-btn-group">
        <Link to="/details" onClick={handleEurUsdClick}>
          <Button variant="contained" sx={{ margin: "20px" }}>
            EUR-USD Details
          </Button>
        </Link>
        <Link to="/details" onClick={handleEurGbpClick}>
          <Button variant="contained" sx={{ margin: "20px" }}>
            EUR-GBP Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
