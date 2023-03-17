document.addEventListener("DOMContentLoaded", function () {
	var windKW = this.getElementById("WindKW").value;
	var solarKW = this.getElementById("SolarKW").value;
	var dieselKW = this.getElementById("DieselKW").value;
	var windP = this.getElementById("WindTP").dataset.percent;
	var solarP = this.getElementById("SolarTP").dataset.percent;
	var dieselP = this.getElementById("DieselTP").dataset.percent;
	console.log(solarP);

	Highcharts.chart("bubbleContainer", {
		chart: {
			type: "packedbubble",
		},
		title: {
			text: "",
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
					seriesInteraction: true,
					dragBetweenSeries: false,
					parentNodeLimit: true,
				},
				dataLabels: {
					enabled: true,
					format: "{point.name} {point.percent}%",
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
				//Renewables Series
				name: "Renewables", 
				data: [
					{
						name: "Wind",
						value: windKW,
						percent: windP,
					},
					{
						name: "Solar",
						value: solarKW,
						percent: solarP,
					},
				],
			},
			{
				//Non-Renewables Series
				name: "Non-Renewables",
				data: [
					{
						name: "Diesel",
						value: dieselKW,
						percent: dieselP,
					},
				],
			},
		],
	});
});
