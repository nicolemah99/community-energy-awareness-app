let savings_datapoints;
let startPicker;
let endPicker;

function accumulate(data) {
  let sum = 0;
  return data.map(item => {
    sum += item.y;
    return { x: item.x, y: sum };
  });
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

// Using fetch API for simplicity
function getChartData() {
	return fetch("/dashboard_data.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((json) => {
      savings_datapoints = json.savings_datapoints;
			return { success: true };
		})
		.catch((e) => {
			console.log("There was a problem with the fetch operation: " + e.message);
			return { success: false, error: e.message };
		});
}

function drawSavingsChart() {
	const savingsChart = document.getElementById("savingsChart");
	var options = {
    series: [{
    name: 'Savings',
    data: accumulate(savings_datapoints)
    }],
    chart: {
      type: 'area',
      events: {
        zoomed: function(chartContext, { xaxis }) {
          let startIndex = savings_datapoints.findIndex(item => new Date(item.x) >= new Date(xaxis.min));
          let endIndex = savings_datapoints.findIndex(item => new Date(item.x) >= new Date(xaxis.max));
          if (startIndex == endIndex){
            startIndex-= 1
          }
          else if(startIndex > 0 && 0 < endIndex && endIndex < savings_datapoints.length) {
            let visibleData = savings_datapoints.slice(startIndex, endIndex + 1);
            let accumulatedVisibleData = accumulate(visibleData);
            window.savingsChartObj.updateSeries([{ data: accumulatedVisibleData }]);
          }
          else{
            window.savingsChartObj.updateSeries([{ data: accumulate(savings_datapoints) }]);
          }
        }
      },
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Fuel Savings',
      align: 'left'
    },
    fill: {
      type: 'solid',
      colors: ['#00a1e4'],
      opacity: 0.65
    },
    stroke: {
      colors: ['#00a1e4'],
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val.toFixed(2));
        },
      },
      title: {
        text: 'Gallons of Diesel'
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      x: {
        format: 'dd MMM, HH:mm'
      }
    }
  };
  
	// If charts already exist, destroy them to prevent multiple instances
	if (window.savingsChartObj) window.savingsChartObj.destroy();
  
	// Draw new chart
	window.savingsChartObj = new ApexCharts(savingsChart, options);
  window.savingsChartObj.render();
  }
function loadCharts() {
	getChartData().then((result) => {
		if (result.success) {
			drawSavingsChart();
		} else {
			console.log("Failed to fetch data:", result.error);
		}
	});
}
document.addEventListener("turbo:load", (event) => {
	const rootPath = "/";
	const url = new URL(event.detail.url);

	//If user clicked on root link
	if (url.pathname == rootPath) {
		const savingsChart = document.getElementById("savingsChart");
		if (savingsChart) {
			loadCharts();
			setUpDatePickers();
		}
	}
});

function filterData(){
  const startdateValue = new Date(document.getElementById('startdate').value).getTime();
  const enddateValue = new Date(document.getElementById('enddate').value).getTime();

  const filteredData = savings_datapoints.filter(item => {
      const itemDate = new Date(item.x).getTime();
      return itemDate >= startdateValue && itemDate <= enddateValue;
  });
  
  if (filteredData.length) {
      const accumulatedData = accumulate(filteredData);
      window.savingsChartObj.updateSeries([{ data: accumulatedData }]);
    }
  };
  
