document.addEventListener("DOMContentLoaded", function () {
	var wind_kwh = gon.wind_kwh;
	var solar_kwh = gon.solar_kwh;
	var diesel_kwh = gon.diesel_kwh;
	var wind_percent = gon.wind_percent;
	var solar_percent = gon.solar_percent;
	var diesel_percent = gon.diesel_percent;

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
					gravitationalvarant: 0.05,
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
						value: wind_kwh,
						percent: `${wind_percent} %`,
						color: "#0096FF",
					},
					{
						name: "Solar",
						value: solar_kwh,
						percent: `${solar_percent} %`,
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
						value: diesel_kwh,
						percent: `${diesel_percent} %`,
						color: "#8B8000",
					},
				],
			},
		],
	});
});
