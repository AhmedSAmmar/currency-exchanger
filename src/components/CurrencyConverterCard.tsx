import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, MenuItem, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startDate, endDate } from "../date";
import "./CurrencyConverterCard.css";
import {
  currencyHistoricalRates,
  currencyRateResults,
  currencyRates,
} from "../api";
import { currencies } from "../currencies";
import {
  currencyValueChangeAction,
  fromCurrencyChangeAction,
  toCurrencyChangeAction,
} from "../features/currencyChangesSlice";

interface Props {
  btnNotDisabled: boolean;
  fromCurrencyDisabled: boolean;
}

const CurrencyConverterCard: FC<Props> = ({
  btnNotDisabled,
  fromCurrencyDisabled,
}) => {
  const dispatch = useDispatch();

  const { fromCurrency, toCurrency, currencyValue, currencyResult } =
    useSelector((state: RootState) => state.currency.value);

  const { fromCurrencyChange, toCurrencyChange, currencyValueChange } =
    useSelector((state: RootState) => state.currencyChanges.value);

  const currencyRate = useSelector(
    (state: RootState) => state.currency.value.currencyRate
  );

  const handleCurrencyChange = (event: { target: { value: string } }) => {
    dispatch(currencyValueChangeAction(event.target.value));
  };

  const handleFromCurrencyChange = (event: { target: { value: string } }) => {
    dispatch(fromCurrencyChangeAction(event.target.value));
  };

  const handleToCurrencyChange = (event: { target: { value: string } }) => {
    dispatch(toCurrencyChangeAction(event.target.value));
  };

  const handleClick = () => {
    currencyRateResults({
      fromCurrencyChange,
      toCurrencyChange,
      currencyValueChange,
    });
    currencyRates(fromCurrencyChange);
    currencyHistoricalRates({
      fromCurrencyChange,
      toCurrencyChange,
      startDate,
      endDate,
    });
  };

  const handleArrowClick = () => {
    dispatch(fromCurrencyChangeAction(toCurrencyChange));
    dispatch(toCurrencyChangeAction(fromCurrencyChange));
  };

  return (
    <div className="currency-rates">
      <div className="currency-card">
        <div className="currency-transfer">
          <TextField
            id="outlined-multiline-flexible"
            label="Amount"
            type="number"
            value={currencyValueChange}
            onChange={handleCurrencyChange}
            className="currency-item"
          />
          <TextField
            id="outlined-select-currency"
            select
            label="From"
            value={fromCurrencyChange}
            onChange={handleFromCurrencyChange}
            className="currency-item"
            disabled={fromCurrencyDisabled}
          >
            {currencies.map((newCurrency) => (
              <MenuItem key={newCurrency.symbol} value={newCurrency.symbol}>
                {newCurrency.symbol}
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
            value={toCurrencyChange}
            onChange={handleToCurrencyChange}
            className="currency-item"
          >
            {currencies
              .map((currency) => currency.symbol)
              .filter((currency) => currency !== fromCurrencyChange)
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
