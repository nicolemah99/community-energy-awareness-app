let formattedSavings;

function accumulate(data) {
  let sum = 0;
  return data.map(item => {
    sum += item.y;
    return { x: item.x, y: sum };
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
      formattedSavings = json.formattedSavings;
      console.log(formattedSavings)
			return { success: true };
		})
		.catch((e) => {
			console.log("There was a problem with the fetch operation: " + e.message);
			return { success: false, error: e.message };
		});
}

function drawSavingsChart() {
	const savingsChart = document.getElementById("apexchart");
	//const cumulativeSumArray = accumulate(savingsDataObject.data[0]);
	//savingsDataObject.data.push(cumulativeSumArray)
	var options = {
    series: [{
    name: 'Savings',
    data: accumulate(formattedSavings)
    }],
    chart: {
      type: 'area',
      events: {
        zoomed: function(chartContext, { xaxis }) {
          let startIndex = formattedSavings.findIndex(item => new Date(item.x) >= new Date(xaxis.min));
          let endIndex = formattedSavings.findIndex(item => new Date(item.x) >= new Date(xaxis.max));
          if (startIndex == endIndex){
            startIndex-= 1
          }
          else if(startIndex > 0 && 0 < endIndex && endIndex < formattedSavings.length) {
            let visibleData = formattedSavings.slice(startIndex, endIndex + 1);
            let accumulatedVisibleData = accumulate(visibleData);
            window.savingsChartObj.updateSeries([{ data: accumulatedVisibleData }]);
          }
          else{
            window.savingsChartObj.updateSeries([{ data: accumulate(formattedSavings) }]);
          }
        }
      },
      stacked: false,
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
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 90, 100]
      },
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
      shared: false,
      y: {
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
		const elecGenMainChart = document.getElementById("elecGenMainChart");
		const elecGenOverviewChart = document.getElementById(
			"elecGenOverviewChart"
		);
		const savingsChart = document.getElementById("apexchart");
		if (elecGenMainChart && elecGenOverviewChart && savingsChart) {
			loadCharts();
			//setUpDatePickers();
      //setUpEventListeners();
		}
	}
});
