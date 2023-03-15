document.addEventListener("DOMContentLoaded", function () {
  var windKW = this.getElementById("WindKW").value;
	var solarKW = this.getElementById("SolarKW").value;
	var dieselKW = this.getElementById("DieselKW").value;
	var windP = this.getElementById("WindP").value;
	var solarP = this.getElementById("SolarP").value;
	var nRenewP = this.getElementById("NRenewP").value;
	var renewP = this.getElementById("RenewP").value;
  const ctx = document.getElementById('doughnutContainer');
  const data = {
    labels: ['Diesel', 'Wind', 'Solar'],
    datasets: [{
      label: 'kwh',
      data: [dieselKW, windKW, solarKW],
      backgroundColor: ['rgb(127,112,83)', 'rgb(54, 162, 235)','rgb(255, 205, 86)'],
    }]
  };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend:{
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js'
            }
          }
        },
    });
    
});