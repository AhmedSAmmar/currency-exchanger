import { Button } from "@mui/material";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../app/store";
import CurrencyConverterCard from "../components/CurrencyConverterCard";
import CurrencyHitoricalRates from "../components/CurrencyHitoricalRates";
import NavBar from "../components/NavBar";
import { currencies } from "../currencies";

const Details: FC = () => {
  const fromCurrency = useSelector(
    (state: RootState) => state.currency.value.fromCurrency
  );

  const currencyName = currencies.filter(
    (currency) => currency.symbol === fromCurrency
  );

  return (
    <div>
      <NavBar />
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px 20px",
        }}
      >
        <Link to="/">
          <Button variant="contained">Return to Home</Button>
        </Link>
      </div>

      <h1 style={{ marginTop: "50px" }}>
        {
          currencies.filter((currency) => currency.symbol === fromCurrency)[0]
            .name
        }
      </h1>
      <CurrencyConverterCard
        btnNotDisabled={false}
        fromCurrencyDisabled={true}
      />
      <CurrencyHitoricalRates />
    </div>
  );
};

export default Details;
