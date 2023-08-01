function prepareDataForApexChart(dates, labels) {
  if (dates.length !== labels.length) {
      throw new Error('Dates and labels arrays must have the same length');
  }

  var result = {
      series: [{
          name: "series-1",
          data: labels
      }],
      xaxis: {
          categories: dates
      }
  };

  return result;
}

var today = new Date();
// Set start date to January 1st of the current year
var startDate = new Date(today.getFullYear(), 0, 1);

// Generate hourly data points from start date to today
var dates = [];
var value = 0; // starting value
for (var d = startDate; d <= today; d.setHours(d.getHours() + 1)) {
    var increase = Math.floor(Math.random() * 100) + 20; // random increase between 20 and 120
    value += increase;
    dates.push({
        x: new Date(d), // clone date object to avoid mutation
        y: value
    });
}

const savingsDataObject = {
	data: [
	]
  };

savingsDataObject.data[0] = gon.savings_raw_datapoints;
const accumulate = array => array.map((sum => value => sum += value)(0));
const cumulativeSumArray = accumulate(savingsDataObject.data[0]);
savingsDataObject.data.push(cumulativeSumArray)

console.log(dates)

var options = {
    series: [{
    name: 'Savings',
    data: prepareDataForApexChart(dates, labels)
  }],
    chart: {
    type: 'area',
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
    text: '$ Savings',
    align: 'left'
  },
  fill: {
    type: 'gradient',
    colors: ['#9BD0F5', '#36A2EB'],
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
      
    },
    title: {
      text: 'Dollar'
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

  var chart = new ApexCharts(document.querySelector("#apexchart"), options);
  chart.render();
