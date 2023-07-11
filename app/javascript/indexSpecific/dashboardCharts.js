let windKwh;
let solarKwh;
let dieselKwh;
let labels = gon.complete_savings_dates;
let savingsDataPoints = gon.complete_savings;

/**
 * Fetch data from /dashboard_data.json, update global variables and return a promise
 */

function getChartData() {
	return fetch("/dashboard_data.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((json) => {
			windKwh = json.wind_kwh;
			solarKwh = json.solar_kwh;
			dieselKwh = json.diesel_kwh;
			return { success: true };
		})
		.catch((e) => {
			console.log("There was a problem with the fetch operation: " + e.message);
			return { success: false, error: e.message };
		});
}
function drawSavingsChart() {
	const savingsChart = document.getElementById("savings-chart");
	var maxvalue = savingsDataPoints[savingsDataPoints.length - 1].y;
	var maxticks = Math.round(maxvalue / 50000) * 50000 + 50000;

	const savingsData = {
		labels: labels,
		datasets: [
			{
				label: "$ Diesel Savings",
				data: savingsDataPoints,
				borderWidth: 2.5,
				fill: true,
			},
		],
	};
	const configSavings = {
		type: "line",
		data: savingsData,
		options: {
			responsive: true,
			pointRadius: 0,
			pointHoverRadius: 5,
			maintainAspectRatio: false,
			scales: {
				x: {
					title: {
						display: true,
						text: "Date",
					},
				},
				y: {
					title: {
						display: true,
						text: "Dollar",
					},
					beginAtZero: true,
					max: maxticks,
				},
			},
		},
	};

	// If charts already exist, destroy them to prevent multiple instances
	if (window.savingsChart) window.savingsChart.destroy();

	// Draw new chart
	window.savingsChart = new Chart(savingsChart, configSavings);
}
/**
 * Draw doughnut chart using fetched data after checking whether elements exist
 */
function drawDoughnutChart() {
	const elecGenMain = document.getElementById("doughnut-main");
	const elecGenOverview = document.getElementById("doughnut-overview");

	const generationData = {
		labels: ["Solar", "Wind", "Diesel"],
		datasets: [
			{
				borderWidth: 0.25,
				label: "kWh",
				data: [solarKwh, windKwh, dieselKwh],
				backgroundColor: ["#FDDA0D", "#0096FF", "#8B8000"],
				hoverOffset: 4,
			},
		],
	};

	const configDoughnut = {
		type: "doughnut",
		data: generationData,
		options: {
			layout: {
				padding: {
					bottom: 20,
				},
			},
			responsive: true,
			maintainAspectRatio: true,
		},
	};

	// If charts already exist, destroy them to prevent multiple instances
	if (window.genChartMain) window.genChartMain.destroy();
	if (window.genChartOverview) window.genChartOverview.destroy();

	// Draw new charts
	window.genChartMain = new Chart(elecGenMain, configDoughnut);
	window.genChartOverview = new Chart(elecGenOverview, configDoughnut);
}

/**
 * Load chart data and then draw the chart
 */
function loadCharts() {
	getChartData().then((result) => {
		if (result.success) {
			drawDoughnutChart();
		} else {
			console.log("Failed to fetch data:", result.error);
		}
	});
}

// Listen for Turbo's page load event, then load the charts
document.addEventListener("turbo:load", () => {
	const elecGenMain = document.getElementById("doughnut-main");
	const elecGenOverview = document.getElementById("doughnut-overview");
	const savingsChart = document.getElementById("savings-chart");
	if (elecGenMain && elecGenOverview) {
		loadCharts();
	}

	if (savingsChart) {
		drawSavingsChart();
	}
});

// Create a debounce function for the window resize event
let resizeTimeout;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		drawDoughnutChart();
		drawSavingsChart();
	}, 250);
});

function filterSavingsData() {
	const dates2 = [...labels];
	console.log(dates2);

	const indexStartDate = dates2.indexOf(startDate.value);
	const indexEndDate = dates2.indexOf(endDate.value);
	console.log(indexStartDate);

	const filterDate = dates2.slice(indexStartDate, indexEndDate + 1);

	savingsChart.config.data.labels = filterDate;

	const dataPointsArray = [...savingsDataPoints];
	const filterDataPoints = dataPointsArray.slice(
		indexStartDate,
		indexEndDate + 1
	);

	savingsChart.config.data.datasets[0].data = filterDataPoints;

	savingsChart.update();
}
