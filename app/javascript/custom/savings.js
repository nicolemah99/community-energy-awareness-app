

//const labels = document.getElementById("savingsdate").innerHTML;
//const datapoints = document.getElementById("savings").innerHTML;
const datapoints = gon.completesavings

console.log(datapoints)
console.log(datapoints)
const fakeData = [
    {"x":"2022-01-01 12:00", "y":22},
    {"x":"2022-01-02 13:00", "y":23},
    {"x":"2022-01-03 09:00", "y":30}
]
console.log(fakeData)

// const data = {
//     labels: labels,
//     datasets: [{
//         label: '$ Diesel Savings',
//         data: datapoints,
//         borderWidth: 0.5
//     }]
// }
const data = {
    datasets: [{
        label: '$ Diesel Savings',
        //data: datapoints,
        data: fakeData,
        borderWidth: 0.5
    }],
};
const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            // xAxes:{
            //     type: 'time',
            //     time: {
            //         unit: 'day', 
            //         parser: 'yyyy-MM-dd HH:mm'
            //     }
            // }
            // xAxes: {
            //     type: 'time',
            //     time: {
            //         unit: 'day',
            //         parser: 'yyyy-MM-dd'
            //     }
            //      },
            // //      adapters: {
            // //          date: {
            // //              locale: de     
            // //         }
            
            // // },
            // yAxes: {
            //     beginAtZero: true
            // }
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
