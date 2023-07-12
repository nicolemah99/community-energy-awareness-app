let windKwh;
let solarKwh;
let dieselKwh;
let labels;
let savingsDataPoints;
let maxValue;
let maxTicks;

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
			savingsDataPoints = json.savingsData;
			labels = json.labels;
			maxValue = savingsDataPoints[savingsDataPoints.length - 1].y;
			maxTicks = Math.round(maxValue / 50000) * 50000 + 50000;
			return { success: true };
		})
		.catch((e) => {
			console.log("There was a problem with the fetch operation: " + e.message);
			return { success: false, error: e.message };
		});
}
function drawSavingsChart() {
	const savingsChart = document.getElementById("savingsChart");
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
					max: maxTicks,
				},
			},
		},
	};

	// If charts already exist, destroy them to prevent multiple instances
	if (window.savingsChartObj) window.savingsChartObj.destroy();

	// Draw new chart
	window.savingsChartObj = new Chart(savingsChart, configSavings);
}
/**
 * Draw doughnut chart using fetched data after checking whether elements exist
 */
function drawDoughnutChart() {
	const elecGenMainChart = document.getElementById("elecGenMainChart");
	const elecGenOverviewChart = document.getElementById("elecGenOverviewChart");

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

	const configElecGen = {
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
	if (window.genChartMainObj) window.genChartMainObj.destroy();
	if (window.genChartOverviewObj) window.genChartOverviewObj.destroy();

	// Draw new charts
	window.genChartMainObj = new Chart(elecGenMainChart, configElecGen);
	window.genChartOverviewObj = new Chart(elecGenOverviewChart, configElecGen);
}

/**
 * Load chart data and then draw the chart
 */
function loadCharts() {
	getChartData().then((result) => {
		if (result.success) {
			drawDoughnutChart();
			drawSavingsChart();
		} else {
			console.log("Failed to fetch data:", result.error);
		}
	});
}

// Listen for Turbo's page load event, then load the charts
document.addEventListener("turbo:load", (event) => {
	const rootPath = "/";
	const url = new URL(event.detail.url);

	//If user clicked on root link
	if (url.pathname == rootPath) {
		const elecGenMainChart = document.getElementById("elecGenMainChart");
		const elecGenOverviewChart = document.getElementById(
			"elecGenOverviewChart"
		);
		const savingsChart = document.getElementById("savingsChart");
		if (elecGenMainChart && elecGenOverviewChart && savingsChart) {
			loadCharts();
		}
	}
});

// Create a debounce function for the window resize event
window.addEventListener("resize", () => {
	drawDoughnutChart();
	drawSavingsChart();
})

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
