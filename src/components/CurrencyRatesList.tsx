import { Box, CircularProgress } from "@mui/material";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import "./CurrencyRatesList.css";

const CurrencyRatesList: FC = () => {
  const currencyRates = useSelector(
    (state: RootState) => state.currencyRates.value
  );
  const newCurrencyRates = Object.entries(currencyRates);

  if (currencyRates) {
    return (
      <div className="rates-list">
        {newCurrencyRates.map((currency, index) => (
          <div className="rate" key={index}>
            {currency[0]} {currency[1]}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
      <CircularProgress size={80} />
    </Box>
  );
};

export default CurrencyRatesList;
