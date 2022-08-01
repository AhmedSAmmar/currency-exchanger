import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const CurrencyHitoricalRates: FC = () => {
  const currencyHistoricalRates = useSelector(
    (state: RootState) => state.currencyHistoricalRates.value
  );

  const toCurrency = useSelector(
    (state: RootState) => state.currency.value.toCurrency
  );

  const newHistoricalRates = Object.entries(currencyHistoricalRates);

  const newData = newHistoricalRates.filter((rate) => {
    let date = rate[0];
    const newDate = new Date(date);
    let day = newDate.getDate();

    let lastDayOfMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0
    );

    let lastDay = lastDayOfMonth.getDate();

    return day === lastDay;
  });

  const currencyMonth = newData.map((data) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date(data[0]);
    let name = month[d.getMonth()];

    return name;
  });

  const currencyMonthlyRates = newData.map((data) => data[1][`${toCurrency}`]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Chart
        type="line"
        datasetIdKey="id"
        style={{
          maxWidth: "600px",
          maxHeight: "400px",
        }}
        data={{
          labels: currencyMonth,
          datasets: [
            {
              label: `${toCurrency}`,
              data: currencyMonthlyRates,
              backgroundColor: "rgb(255, 99, 132)",
            },
          ],
        }}
      />
    </div>
  );
};

export default CurrencyHitoricalRates;
