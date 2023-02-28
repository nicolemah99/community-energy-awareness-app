document.addEventListener("DOMContentLoaded", function () {
	Highcharts.chart("container", {
		chart: {
			type: "packedbubble",
			height: "50%",
		},
		title: {
			text: "Electricity Generation Breakdown",
			align: "center",
		},
		tooltip: {
			useHTML: true,
			pointFormat: "<b>{point.name}:</b> {point.value}kw",
		},
		plotOptions: {
			packedbubble: {
				minSize: "20%",
				maxSize: "100%",
				zMin: 0,
				zMax: 1000,
				layoutAlgorithm: {
					gravitationalConstant: 0.05,
					splitSeries: true,
					seriesInteraction: false,
					dragBetweenSeries: true,
					parentNodeLimit: true,
				},
				dataLabels: {
					enabled: true,
					format: "{point.name}",
					filter: {
						property: "y",
						operator: ">",
						value: 250,
					},
					style: {
						color: "black",
						textOutline: "none",
						fontWeight: "normal",
					},
				},
			},
		},
		series: [
			{
				name: "Renewables",
				data: [
					{
						name: "Wind",
						value: 7.2,
					},
					{
						name: "Solar",
						value: 8.1,
					},
				],
			},
			{
				name: "Non-Renewables",
				data: [
					{
						name: "Diesel",
						value: 6.5,
					},
				],
			},
		],
	});
});
