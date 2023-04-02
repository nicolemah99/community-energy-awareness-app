document.addEventListener("DOMContentLoaded", function () {
	var windKW = gon.wind_kwh;
	var solarKW = gon.solar_kwh;
	var dieselKW = gon.diesel_kwh;
	var windP = gon.wind_percent;
	var solarP = gon.solar_percent;
	var dieselP = gon.diesel_percent;

	Highcharts.chart("bubbleContainer", {
		chart: {
			type: "packedbubble",
			height: "70%",
			styleMode: true,
		},
		legend: {
			itemMarginBottom: 10,
			layout: "vertical",
			itemStyle: {
            	fontSize: '18px',
				color: '#525f7f', //legend font color
        	},
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
				zMin: 0,
				zMax: 1000,
				color: "{point.color}",
				useSimulation: true,
				layoutAlgorithm: {
					gravitationalConstant: 0.05,
					seriesInteraction: true,
					splitSeries:true,
					dragBetweenSeries: false,
					parentNodeLimit: true,
				},
				dataLabels: {
					enabled: true,
					useHTML: true,
					format: "{point.name}<br>{point.percent}",
					style: {
						color: "black",
						textOutline: "none",
						fontSize:'1vmax',
						fontHeight: '1vmin',
						
					},
				},
			},
		},
		series: [
			{
				//Renewables Series
				name: "Renewables", 
				color: "#4F7942",
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
				name: "Non Renewables",
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
