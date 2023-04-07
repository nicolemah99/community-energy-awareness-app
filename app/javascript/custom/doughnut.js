const ctx = document.getElementById('doughnutChart');
const data = {
  labels: [
    'Renewables',
    'Non Renewables'
  ],
  datasets: [{
    label: 'kWh',
    data: [300, 50],
    backgroundColor: [
      '#4F7942',
      '#808080'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'doughnut',
  data: data,
};

new Chart(ctx, config);

const ctx2 = document.getElementById('doughnutChart2');
const data2 = {
  labels: [
    'Solar',
    'Wind',
    'Diesel'
  ],
  datasets: [{
    label: 'kWh',
    data: [300, 50, 100],
    backgroundColor: [
      '#FDDA0D',
      '#0096FF',
      '#8B8000'
    ],
    hoverOffset: 4
  }]
};

const config2 = {
  type: 'doughnut',
  data: data2,
};

new Chart(ctx2, config2);
