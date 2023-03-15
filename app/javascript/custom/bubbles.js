document.addEventListener("DOMContentLoaded", function () {
	var windKW = this.getElementById("WindKW").value;
	var solarKW = this.getElementById("SolarKW").value;
	var dieselKW = this.getElementById("DieselKW").value;
	var windP = this.getElementById("WindP").value;
	var solarP = this.getElementById("SolarP").value;
	var nRenewP = this.getElementById("NRenewP").value;
	var renewP = this.getElementById("RenewP").value;
	Highcharts.chart("bubbleContainer", {
		chart: {
			type: "packedbubble",
			height: "50%",
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
					splitSeries: true,
					seriesInteraction: false,
					dragBetweenSeries: false,
					parentNodeLimit: false,
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
				name: "Non-Renewables",
				data: [
					{
						name: "Diesel",
						value: dieselKW,
						percent: nRenewP,
					},
				],
			},
		],
	});
});
