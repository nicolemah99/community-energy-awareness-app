var data = this.getElementById("monthsavingArray").value;
var data2 = this.getElementById("fmonthsavingArray").value;
alert(data, data2)
const datass = [ data, data2 ]
const ctx = document.getElementById('savingschart');
const lables = ['January', 'February']
	new Chart(ctx, {
	  type: 'line',
	  data: {
		labels: lables,
		datasets: [{
		  label: 'Dollar savings',
		  data: datass,
		  borderWidth: 1
		}]
	  },
	  options: {
		scales: {
		  y: {
			beginAtZero: true
		  }
		}
	  }
	});
    




const chart = new Chart(testingchart, {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});