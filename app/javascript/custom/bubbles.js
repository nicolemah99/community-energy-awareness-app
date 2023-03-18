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
			height: "100%"
		},
		title: {
			text: "",
			align: "center",
		},
		tooltip: {
			useHTML: true,
			pointFormat: "<b>{point.name}</b>: {point.value}kWh",
			followPointer: true,
			borderColor: "{series.color}",
		},
		plotOptions: {
			packedbubble: {
				minSize: "20%",
				maxSize: "65%",

				zMin: 0,
				zMax: 1000,
				color: "{point.color}",
				useSimulation: true,
				layoutAlgorithm: {
					gravitationalConstant: 0.01,
					seriesInteraction: true,
					splitSeries:true,
					dragBetweenSeries: false,
					parentNodeLimit: true,
				},
				dataLabels: {
					enabled: true,
					format: "{point.name} {point.percent}",
					style: {
						color: "{series.color}",
						textOutline: "none",
						fontWeight: "bold",
					},
				},
			},
		},
		series: [
			{
				//Renewables Series
				name: "Renewables", 
				color: "#228B22",
				data: [
					{
						name: "Wind",
						value: windKW,
						percent: `${windP} %`,
						color: "#0096FF",
					},
					{
						name: "Solar",
						value: solarKW,
						percent: `${solarP} %`,
						color: "#FDDA0D",
					},
				],
			},
			{
				//Non-Renewables Series
				name: "Non-Renewables",
				color: "#808080",
				data: [
					{
						name: "Diesel",
						value: dieselKW,
						percent: `${dieselP} %`,
						color: "#8B8000",
					},
				],
			},
		],
	});
});
