import { Button } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import CurrencyConverterCard from "../components/CurrencyConverterCard";
import CurrencyHitoricalRates from "../components/CurrencyHitoricalRates";
import NavBar from "../components/NavBar";

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

const Details: FC = () => {
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

      <CurrencyConverterCard currencies={currencies} btnNotDisabled={false} />
      <CurrencyHitoricalRates />
    </div>
  );
};

export default Details;
