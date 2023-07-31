let windKwh;
let solarKwh;
let dieselKwh;
let labels;
let savingsDataPoints;
let startPicker;
let endPicker;

// function for acumulate savings
const accumulate = array => array.map((sum => value => sum += value)(0));

// date selection 
function setUpEventListeners() {
	document.getElementById('lastHour').addEventListener('click', () => displaySavings('hour'));
	document.getElementById('lastWeek').addEventListener('click', () => displaySavings('week'));
	document.getElementById('lastMonth').addEventListener('click', () => displaySavings('month'));
}

function setUpDatePickers() {

	document.querySelector('#startdate').addEventListener('change', filterData);
	document.querySelector('#enddate').addEventListener('change', filterData);

	let currentHourDate = new Date();
	currentHourDate.setFullYear(2021); 
	currentHourDate.setHours(currentHourDate.getHours() - 1);
	currentHourDate.setMinutes(0);
	currentHourDate.setSeconds(0);

	startPicker = flatpickr("#startdate", {
	enableTime: true,
	dateFormat: "Y-m-d H:00:00",
	maxDate: currentHourDate,
	minDate: '2021-01-01 00:00:00',
	});

	endPicker = flatpickr("#enddate", {
	enableTime: true,
	dateFormat: "Y-m-d H:00:00",
	maxDate: currentHourDate,
	minDate: '2021-01-01 01:00:00',
	});
}

const savingsDataObject = {
	data: [
	]
  };
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
			savingsDataObject.data[0] = json.savingsData;
			labels = json.labels;
			return { success: true };
		})
		.catch((e) => {
			console.log("There was a problem with the fetch operation: " + e.message);
			return { success: false, error: e.message };
		});
}

let configSavings = {
	type: "line",
	options: {
	  responsive: true,
	  pointRadius: 0,
	  pointHoverRadius: 5,
	  maintainAspectRatio: false,
	  scales: {
		x: {
		  title: {
			display: true,
			text: 'Date'
		  },
		  type: 'time',
		  time: {
			unit: 'day'
		  }
		},
		y: {
		  title: {
			display: true,
			text: 'Dollar'
		  },
		  beginAtZero: true
		}
	  },
	},
  };
  
  function drawSavingsChart() {
	const savingsChart = document.getElementById("savingsChart");
	const cumulativeSumArray = accumulate(savingsDataObject.data[0]);
	savingsDataObject.data.push(cumulativeSumArray)
	const savingsData = {
	  labels: labels,
	  datasets: [
		{
		  label: "$ Diesel Savings",
		  data: savingsDataObject.data[1].map(x => Number(x.toFixed(2))),
		  borderWidth: 2.5,
		  fill: true,
		},
	  ],
	};
  
	// Assign the data to configSavings
	configSavings.data = savingsData;
  
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
			//drawDoughnutChart();
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
		//const elecGenMainChart = document.getElementById("elecGenMainChart");
		//const elecGenOverviewChart = document.getElementById(
		//	"elecGenOverviewChart"
		//);
		const savingsChart = document.getElementById("savingsChart");
		if (savingsChart) {
			loadCharts();
			setUpDatePickers();
      		setUpEventListeners();
		}
	}
});

// Create a debounce function for the window resize event
window.addEventListener("resize", () => {
	drawDoughnutChart();
	drawSavingsChart();
})

function displaySavings(period){
	let endDate = new Date();
	endDate.setFullYear(2021);
	endDate.setHours(endDate.getHours() - 1);
	endDate.setMinutes(0);
	endDate.setSeconds(0);
	let startDate = new Date(endDate); 
  
	switch(period){
	  case 'hour':
		startDate.setHours(startDate.getHours() - 1);
		break;
	  case 'week':
		startDate.setDate(startDate.getDate() - 7);
		break;
	  case 'month':
		startDate.setMonth(startDate.getMonth() - 1);
		break;
	}
	
	 new Promise((resolve, reject) => {
	  startPicker.setDate(startDate);
	  endPicker.setDate(endDate);
	  // check if the enddate has been changed from the current date
	  if (endPicker.selectedDates[0] && endPicker.selectedDates[0].getTime() !== endDate.getTime()) {
		endPicker.setDate(endDate);
	  }
	  setTimeout(() => {
		resolve(true);
	  }, 200);
	})
	.then(() => {
	  filterData();
	});
  }
  
function filterData(){
	const dates2 = [...labels];
	console.log(dates2);
	const startdate = document.getElementById('startdate');
	const enddate = document.getElementById('enddate');
  
	const indexstartdate = dates2.indexOf(startdate.value);
	const indexenddate = dates2.indexOf(enddate.value);
	console.log(indexstartdate);
  
	const filterDate = dates2.slice(indexstartdate, indexenddate + 1);
	
	configSavings.data.labels = filterDate;
	const datapoints2 = [...savingsDataObject.data[0]];
	const filterDatapoints = datapoints2.slice(indexstartdate, indexenddate + 1);
	const cumulativeSumArray2 = accumulate(filterDatapoints);
	
	configSavings.data.datasets[0].data = cumulativeSumArray2.map(x => Number(x.toFixed(2)));
  
	window.savingsChartObj.update();
  };