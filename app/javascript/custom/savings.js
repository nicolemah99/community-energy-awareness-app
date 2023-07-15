// savings chart
Chart.defaults.font.size = 15;

const dates = gon.complete_savings_dates
const datapoints = gon.savings_raw_datapoints
const testObject = {
  data: [
    datapoints
  ]
};

const accumulate = array => array.map((sum => value => sum += value)(0));
const cumulativeSumArray = accumulate(testObject.data[0]);
testObject.data.push(cumulativeSumArray)
console.log(testObject.data[1])

const data = {
    labels: dates,
    datasets: [{
      label: '$ Diesel Savings',
      data: testObject.data[1].map(x => Number(x.toFixed(2))),
      borderWidth: 2.5,
      fill: true,
    }]
  };
const config = {
    type: 'line',
    data: data,
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
      }
    },
  };

const ctx = new Chart(document.getElementById('savings-chart'), config);


// Selecting savings dates range
let currentHourDate = new Date();
currentHourDate.setFullYear(2021); 
currentHourDate.setMinutes(0);
currentHourDate.setSeconds(0);

flatpickr("#startdate", {
  enableTime: true,
  dateFormat: "Y-m-d H:00:00",
  maxDate: currentHourDate,
  minDate: '2021-01-01 00:00:00',
});

flatpickr("#enddate", {
  enableTime: true,
  dateFormat: "Y-m-d H:00:00",
  maxDate: currentHourDate,
  minDate: '2021-01-01 01:00:00',
});

document.querySelector('#startdate').addEventListener('change', filterData);
document.querySelector('#enddate').addEventListener('change', filterData);


function filterData(){
  const dates2 = [...dates];
  console.log(dates2);
  const startdate = document.getElementById('startdate');
  const enddate = document.getElementById('enddate');

  const indexstartdate = dates2.indexOf(startdate.value);
  const indexenddate = dates2.indexOf(enddate.value);
  console.log(indexstartdate);

  const filterDate = dates2.slice(indexstartdate, indexenddate +1);
  
  ctx.config.data.labels = filterDate;
  const datapoints2 = [...testObject.data[0]];
  const filterDatapoints = datapoints2.slice(indexstartdate, indexenddate + 1);
  const cumulativeSumArray2 = accumulate(filterDatapoints);
  testObject.data.push(cumulativeSumArray2)
  
  ctx.config.data.datasets[0].data = cumulativeSumArray2.map(x => Number(x.toFixed(2)));

  ctx.update();

};