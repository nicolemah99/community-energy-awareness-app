// Global variables to hold power production data
let windKwh;
let solarKwh;
let dieselKwh;

/**
 * Fetch data from /dashboard_data.json, update global variables and return a promise
 * @return {Promise<{success: boolean, error?: string}>}
 *         A promise that resolves with an object indicating whether the fetch operation was successful,
 *         and an error message when it was not successful.
 */

function getData() {
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
function drawChart() {
	const elecGenMain = document.getElementById("doughnut-main");
	const elecGenOverview = document.getElementById("doughnut-overview");

	// If elements do not exist, exit the function
	if (!elecGenMain || !elecGenOverview) return;

	const elecData = {
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
		data: elecData,
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
	if (window.chartMain) window.chartMain.destroy();
	if (window.chartOverview) window.chartOverview.destroy();

	// Draw new charts
	window.chartMain = new Chart(elecGenMain, configDoughnut);
	window.chartOverview = new Chart(elecGenOverview, configDoughnut);
}

/**
 * Load chart data and then draw the chart
 */
function loadCharts() {
	getData().then((result) => {
		if (result.success) {
			drawChart();
		} else {
			console.log("Failed to fetch data:", result.error);
		}
	});
}

// Listen for Turbo's page load event, then load the charts
document.addEventListener("turbo:load", () => {
	const elecGenMain = document.getElementById("doughnut-main");
	const elecGenOverview = document.getElementById("doughnut-overview");
	if (elecGenMain && elecGenOverview) {
		loadCharts();
	}
});

// Create a debounce function for the window resize event
let resizeTimeout;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(drawChart, 250);
});
