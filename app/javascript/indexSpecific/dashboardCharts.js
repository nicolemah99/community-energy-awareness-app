let windKwh;
let solarKwh;
let dieselKwh;

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
		if (elecGenMainChart && elecGenOverviewChart) {
			loadCharts();
			//setUpDatePickers();
      		//setUpEventListeners();
		}
	}
});

// Create a debounce function for the window resize event
window.addEventListener("resize", () => {
	drawDoughnutChart();
})