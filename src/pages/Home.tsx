import React, { FC } from "react";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";

const Home: FC = () => {
  const fromCurrency = useSelector(
    (state: RootState) => state.currency.value.fromCurrency
  );
  const toCurrency = useSelector(
    (state: RootState) => state.currency.value.toCurrency
  );
  const currencyValue = useSelector(
    (state: RootState) => state.currency.value.currencyValue
  );
  return (
    <div>
      {fromCurrency}
      {toCurrency}
      {currencyValue}
    </div>
  );
};

export default Home;
