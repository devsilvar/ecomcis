import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const uData = [
  4000, 3000, 2000, 2780, 4000, 3000, 2000, 2780, 4000, 3000, 2000, 278,
];
const xLabels = [
  //   "Jan",
  //   "feb",
  //   "Mar",
  //   "April",
  //   "may",
  //   "june",
  "july",
  "Aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

function Chart() {
  return (
    <BarChart
      height={300}
      series={[
        { data: uData, label: "Trending Products", id: "uvId", stack: "total" },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}

export default Chart;
