// savings chart
Chart.defaults.font.size = 15;

const dates = gon.complete_savings_dates
const datapoints = gon.savings_raw_datapoints
const dataObject = {
  data: [
    datapoints
  ]
};

const accumulate = array => array.map((sum => value => sum += value)(0));
const cumulativeSumArray = accumulate(dataObject.data[0]);
dataObject.data.push(cumulativeSumArray)

const data = {
    labels: dates,
    datasets: [{
      label: '$ Diesel Savings',
      data: dataObject.data[1].map(x => Number(x.toFixed(2))),
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
currentHourDate.setHours(currentHourDate.getHours() - 1);
currentHourDate.setMinutes(0);
currentHourDate.setSeconds(0);

let startPicker = flatpickr("#startdate", {
  enableTime: true,
  dateFormat: "Y-m-d H:00:00",
  maxDate: currentHourDate,
  minDate: '2021-01-01 00:00:00',
});

let endPicker = flatpickr("#enddate", {
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

  const filterDate = dates2.slice(indexstartdate, indexenddate + 1);
  
  ctx.data.labels = filterDate;
  const datapoints2 = [...dataObject.data[0]];
  const filterDatapoints = datapoints2.slice(indexstartdate, indexenddate + 1);
  const cumulativeSumArray2 = accumulate(filterDatapoints);
  
  ctx.data.datasets[0].data = cumulativeSumArray2.map(x => Number(x.toFixed(2)));

  ctx.update();
};

document.getElementById('lastHour').addEventListener('click', () => displaySavings('hour'));
document.getElementById('lastWeek').addEventListener('click', () => displaySavings('week'));
document.getElementById('lastMonth').addEventListener('click', () => displaySavings('month'));

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
