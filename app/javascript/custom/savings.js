
const labels = gon.complete_savings_dates
const datapoints = gon.complete_savings

const data = {
    labels: labels,
    datasets: [{
        label: '$ Diesel Savings',
        data: datapoints,
        borderWidth: 0.1,
    }],
};
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
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
