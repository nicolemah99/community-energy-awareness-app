import $ from 'jquery';
import ApexCharts from 'apexcharts';

const DATA_URL = "/dashboard_data.json"
let savings_datapoints;

// Making data points accumulative
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

function getChartData(callback) {
  return $.ajax({
      url: DATA_URL,
      dataType: "json"
  })
      .done(function (json) {
        savings_datapoints = json.savings_datapoints;
          if (typeof callback === "function") {
              callback();
          }
          return { success: true };
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("There was a problem with the fetch operation: " + errorThrown);
          return { success: false, error: errorThrown };
      });
}

function drawSavingsChart() {
	const savingsChart = $("#savingsChart")[0];
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
            savingsChartObj.updateSeries([{ data: accumulatedVisibleData }]);
          }
          else{
            savingsChartObj.updateSeries([{ data: accumulate(savings_datapoints) }]);
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
	if (savingsChartObj) savingsChartObj.destroy();
  
	// Draw new chart
	savingsChartObj = new ApexCharts(savingsChart, options);
  savingsChartObj.render();
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

// Start process once document is ready
document.addEventListener("turbo:load", function () {
  // If we are on the home page, then process the data
  if (window.location.pathname === "/") {
    loadCharts();
    setUpDatePickers();
  }
});

// Get the data selected by the date pickers
function filterData() {
  const startdateValue = new Date($('#startdate').val()).getTime();
  const enddateValue = new Date($('#enddate').val()).getTime();

  const filteredData = savings_datapoints.filter(item => {
      const itemDate = new Date(item.x).getTime();
      return itemDate >= startdateValue && itemDate <= enddateValue;
  });

  if (filteredData.length) {
      const accumulatedData = accumulate(filteredData);
      savingsChartObj.updateSeries([{ data: accumulatedData }]); 
  }
};
  
