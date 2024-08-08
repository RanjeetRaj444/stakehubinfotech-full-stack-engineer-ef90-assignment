import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";

const PriceChart = () => {
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "Price",
				data: [],
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	});

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				"http://localhost:5000/api/orders/completed",
			);
			const data = result.data;
			const labels = data.map((order) =>
				new Date(order.completedAt).toLocaleString(),
			);
			const prices = data.map((order) => order.price);
console.log(prices);

			setChartData({
				labels,
				datasets: [{ ...chartData.datasets[0], data: prices }],
			});
		};

		fetchData();
		const interval = setInterval(fetchData, 5000);
		return () => clearInterval(interval);
	}, []);

	return <Line data={chartData} />;
};

export default PriceChart;
