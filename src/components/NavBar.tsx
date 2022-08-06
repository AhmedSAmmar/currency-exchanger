import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { startDate, endDate } from "../date";
import {
  currencyHistoricalRates,
  currencyRateResults,
  currencyRates,
} from "../api";
import {
  currencyValueChangeAction,
  fromCurrencyChangeAction,
  toCurrencyChangeAction,
} from "../features/currencyChangesSlice";
import { useDispatch } from "react-redux";

const NavBar: FC = () => {
  const dispatch = useDispatch();
  const handleEurUsdClick = () => {
    dispatch(fromCurrencyChangeAction("EUR"));
    dispatch(toCurrencyChangeAction("USD"));
    dispatch(currencyValueChangeAction("1"));
    currencyRateResults({
      fromCurrencyChange: "EUR",
      toCurrencyChange: "USD",
      currencyValueChange: "1",
    });
    currencyRates("EUR");
    currencyHistoricalRates({
      fromCurrencyChange: "EUR",
      toCurrencyChange: "USD",
      startDate: startDate,
      endDate: endDate,
    });
  };

  const handleEurGbpClick = () => {
    dispatch(fromCurrencyChangeAction("EUR"));
    dispatch(toCurrencyChangeAction("GBP"));
    dispatch(currencyValueChangeAction("1"));
    currencyRateResults({
      fromCurrencyChange: "EUR",
      toCurrencyChange: "GBP",
      currencyValueChange: "1",
    });
    currencyRates("EUR");

    currencyHistoricalRates({
      fromCurrencyChange: "EUR",
      toCurrencyChange: "GBP",
      startDate: startDate,
      endDate: endDate,
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
