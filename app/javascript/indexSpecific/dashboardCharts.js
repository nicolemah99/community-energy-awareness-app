// Global variables
let windKwh, solarKwh, dieselKwh;
const labels = gon.complete_savings_dates;
const savingsDataPoints = gon.complete_savings;

// Selectors
const elecGenMain = document.getElementById("doughnut-main");
const elecGenOverview = document.getElementById("doughnut-overview");
const savingsChartElement = document.getElementById("savings-chart");
const startDate = document.getElementById("startdate");
const endDate = document.getElementById("enddate");

// Fetch data from /dashboard_data.json, update global variables and return a promise
async function getChartData() {
	try {
		const response = await fetch("/dashboard_data.json");
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		const json = await response.json();
		windKwh = json.wind_kwh;
		solarKwh = json.solar_kwh;
		dieselKwh = json.diesel_kwh;
		return { success: true };
	} catch (error) {
		console.log(
			"There was a problem with the fetch operation: " + error.message
		);
		return { success: false, error: error.message };
	}
}

// Your existing functions...

function drawDoughnutChart() {
	// If elements do not exist, exit the function
	if (!elecGenMain || !elecGenOverview) return;

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
	if (elecGenMain && elecGenOverview) {
		loadCharts();
	}

	if (savingsChartElement) {
		drawSavingsChart();
	}
});

// Debounce function for the window resize event
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
