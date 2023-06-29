let windKwh;
let solarKwh;
let dieselKwh;

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

			console.log("Data fetched successfully"); // Debug log
			return { success: true };
		})
		.catch((e) => {
			console.log("There was a problem with the fetch operation: " + e.message);
			return { success: false, error: e.message };
		});
}

// Draw chart after data is fetched
function drawChart() {
	const elecGenMain = document.getElementById("doughnut-main");
	const elecGenOverview = document.getElementById("doughnut-overview");

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

	if (window.chartMain) window.chartMain.destroy();
	if (window.chartOverview) window.chartOverview.destroy();

	window.chartMain = new Chart(elecGenMain, configDoughnut);
	window.chartOverview = new Chart(elecGenOverview, configDoughnut);
}

// Call drawChart() on page load
document.addEventListener("DOMContentLoaded", reloadCharts);

// Call drawChart() when the window is resized
window.addEventListener("resize", drawChart);

// Call drawChart() when the fetch is successful
function reloadCharts() {
	getData().then((result) => {
		if (result.success) {
			drawChart();
		} else {
			console.log("Failed to fetch data:", result.error);
		}
	});
}

