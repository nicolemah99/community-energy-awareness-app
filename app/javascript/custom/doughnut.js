document.addEventListener("DOMContentLoaded", function () {
    var windKW = this.getElementById("WindKW").value;
	var solarKW = this.getElementById("SolarKW").value;
	var dieselKW = this.getElementById("DieselKW").value;
	var windP = this.getElementById("WindP").value;
	var solarP = this.getElementById("SolarP").value;
	var nRenewP = this.getElementById("NRenewP").value;
	var renewP = this.getElementById("RenewP").value;
    const ctx = document.getElementById('doughnutContainer');
    const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
        },
        options: {
            plugins: {
                customCanvasBackgroundColor: {
                    color: 'lightgreen'
                }
            }
        },
        plugins: [plugin],
    });
    
});