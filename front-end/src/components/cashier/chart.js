import React, { Component } from "react";
import Chart from "react-apexcharts";
export default class BarChart extends Component {
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
		};
	}
	render() {
		return (
			<Chart
				options={this.state.options}
				series={this.state.series}
				type={this.props.chartType}
				height="100%"
			/>
		);
	}
}
