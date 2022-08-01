import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, MenuItem, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  fromCurrencyAction,
  toCurrencyAction,
  currencyValueAction,
  currencyResultAction,
  currencyRateAction,
} from "../features/currencySlice";
import { currencyRatesAction } from "../features/currencyRatesSlice";
import { Link } from "react-router-dom";
import { startDate, endDate } from "../date";
import { currencyHistoricalRatesAction } from "../features/currencyHistoricalRatesSlice";
import "./CurrencyConverterCard.css";

interface Props {
  currencies: Array<string>;
  btnNotDisabled: boolean;
}
const ApiKey: string = `${process.env.REACT_APP_API_KEY}`;
const CurrencyConverterCard: FC<Props> = ({ currencies, btnNotDisabled }) => {
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

  const currencyRate = useSelector(
    (state: RootState) => state.currency.value.currencyRate
  );

  const [amount, setAmount] = useState<string>(currencyValue);
  const [fromRequestedCurrency, setFromRequestedCurrency] =
    useState<string>(fromCurrency);
  const [toRequestedCurrency, setToRequestedCurrency] =
    useState<string>(toCurrency);

  const handleCurrencyChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFromRequestedCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setToRequestedCurrency(event.target.value);
  };

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
      dispatch(fromCurrencyAction(fromRequestedCurrency));
      dispatch(toCurrencyAction(toRequestedCurrency));
      dispatch(currencyValueAction(amount));
      dispatch(currencyRateAction(response.data.info.rate));
      dispatch(currencyResultAction(response.data.result));
    } catch (error) {
      console.error(error);
    }
  };

  const currencyRates = async (fromRequestedCurrency: string) => {
    try {
      const currencyString = currencies.toString();
      const response = await axios({
        url: `https://api.apilayer.com/fixer/latest?symbols=${currencyString}&base=${fromRequestedCurrency}`,
        headers: { apikey: ApiKey },
      });

      dispatch(currencyRatesAction(response.data.rates));
    } catch (error) {
      console.error(error);
    }
  };

  interface CurrencyHistoricalInfo {
    fromRequestedCurrency: string;
    toRequestedCurrency: string;
    startDate: string;
    endDate: string;
  }

  const currencyHistoricalRates = async ({
    fromRequestedCurrency,
    toRequestedCurrency,
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

  const handleClick = () => {
    currencyRateResults({ fromRequestedCurrency, toRequestedCurrency, amount });
    currencyRates(fromRequestedCurrency);
    currencyHistoricalRates({
      fromRequestedCurrency,
      toRequestedCurrency,
      startDate,
      endDate,
    });
  };

  const handleArrowClick = () => {
    setFromRequestedCurrency(toRequestedCurrency);
    setToRequestedCurrency(fromRequestedCurrency);
  };

  return (
    <div className="currency-rates">
      <div className="currency-card">
        <div className="currency-transfer">
          <TextField
            id="outlined-multiline-flexible"
            label="Amount"
            type="number"
            value={amount}
            onChange={handleCurrencyChange}
            className="currency-item"
          />
          <TextField
            id="outlined-select-currency"
            select
            label="From"
            value={fromRequestedCurrency}
            onChange={handleFromCurrencyChange}
            className="currency-item"
          >
            {currencies.map((newCurrency) => (
              <MenuItem key={newCurrency} value={newCurrency}>
                {newCurrency}
              </MenuItem>
            ))}
          </TextField>

          <Button className="currency-item">
            <FontAwesomeIcon
              icon={faArrowsLeftRight}
              size="3x"
              onClick={handleArrowClick}
            />
          </Button>

          <TextField
            id="outlined-select-currency"
            select
            label="To"
            value={toRequestedCurrency}
            onChange={handleToCurrencyChange}
            className="currency-item"
          >
            {currencies
              .filter((currency) => currency !== fromRequestedCurrency)
              .map((newCurrency) => (
                <MenuItem key={newCurrency} value={newCurrency}>
                  {newCurrency}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className="convert-btn">
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ width: "50%" }}
            className="currency-item"
          >
            Convert
          </Button>
        </div>

        <div className="currency-transfer">
          <div className="currency-rate">
            1 {fromCurrency} = {currencyRate} {toCurrency}
          </div>
          <div className="currency-rate">
            {currencyValue} {fromCurrency} = {currencyResult} {toCurrency}
          </div>
          {btnNotDisabled && (
            <Link to="/details" className="currency-item">
              <Button>More Details</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterCard;
