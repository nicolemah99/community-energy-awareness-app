window.addEventListener("resize", reloadCharts);
document.addEventListener("turbolinks:load", reloadCharts);

var windKwh = gon.wind_kwh;
var solarKwh = gon.solar_kwh;
var dieselKwh = gon.diesel_kwh;
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

var chartMain = new Chart(elecGenMain, configDoughnut);
var chartOverview = new Chart(elecGenOverview, configDoughnut);

function reloadCharts() {
	chartMain.destroy();
	chartOverview.destroy();

	chartMain = new Chart(elecGenMain, configDoughnut);
	chartOverview = new Chart(elecGenOverview, configDoughnut);
}
