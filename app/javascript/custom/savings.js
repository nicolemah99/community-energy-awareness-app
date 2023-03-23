

const ctx = document.getElementById('savingschart');
const lables = ['January', 'February','March', 'Apirl']
	new Chart(ctx, {
	  type: 'line',
	  data: {
		labels: lables,
		datasets: [{
		  label: '$ Diesel savings',
		  data: [1,26,44,31],
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
    


/* 

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
}); */