import React from "react";
import { Chart } from "react-google-charts";


export function PieChart({pieData}) {
    const options = {
        title: "Tasks Details",
      };
  return (
    <Chart
      chartType="PieChart"
      data={[["Todo", "Total task in a label"],...pieData]}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}