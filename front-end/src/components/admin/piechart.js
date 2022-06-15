import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "chart",
        },
        xaxis: {
          categories: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 50, 35, 50, 43, 60, 70, 91, 125, 130, 135, 165],
        },
      ],
      pieseries: [44, 55],
      pieoptions: {
        chart: {
          type: "donut",
        },
        labels: ["Customers", "Employees"],
      },
    };
  }
  render() {
    return (
      <Chart
        options={this.state.pieoptions}
        series={this.state.pieseries}
        type="donut"
        height="100%"
      />
    );
  }
}
