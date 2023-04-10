Chart.defaults.font.size = 14;

const labels = gon.completesavingdates
const datapoints = gon.completesavings

var maxvalue = datapoints[datapoints.length-1].y
var maxticks = (Math.round(maxvalue/100000)*100000) + 100000


const data = {
    labels: labels,
    datasets: [{
        label: '$ Diesel Savings',
        data: datapoints,
        borderWidth: 2.5,
        fill: true,
    }],
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
                }
              },
            y: {
                title: {
                  display: true,
                  text: 'Dollar'
                },
                beginAtZero: true,
                max: maxticks,
                ticks: {
                  stepSize: 100000
              }
              }
        }
        }
};


const ctx = new Chart(document.getElementById('savingschart'), config);


function filterData(){
    const dates2 = [...label];
    console.log(dates2);
    const startdate = document.getElementById('startdate');
    const enddate = document.getElementById('enddate');

    const indexstartdate = dates2.indexOf(startdate.value);
    const indexenddate = dates2.indexOf(enddate.value);
    console.log(indexstartdate);

   const filterDate = dates2.slice(indexstartdate, indexenddate +1);
    
    ctx.config.data.labels = filterDate;
    
    const datapoints2 = [...datapoints];
    const filterDatapoints = datapoints2.slice(indexstartdate, indexenddate + 1);
    
    ctx.config.data.datasets[0].data = filterDatapoints;

    ctx.update();

};
