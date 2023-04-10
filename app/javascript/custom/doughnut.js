
const category_sources = document.getElementById('doughnutChart');
const renew_kwh = gon.renew_kwh;
const non_renew_kwh = gon.diesel_kwh;
var wind_kwh = gon.wind_kwh;
var solar_kwh = gon.solar_kwh;
var diesel_kwh = gon.diesel_kwh;

const data = {
  labels: [
    'Renewables',
    'Non Renewables'
  ],
  datasets: [{
    label: 'kWh',
    data: [renew_kwh, non_renew_kwh],
    backgroundColor: [
      '#4F7942',
      '#808080'
    ],
    hoverOffset: 4
  }]
};

const config_category_sources = {
  type: 'doughnut',
  data: data,
  options: {
    layout: {
            padding: {
                bottom: 20
            }
        },
    responsive: true,
    maintainAspectRatio: true,
  }
};

new Chart(category_sources, config_category_sources);

const all_sources = document.getElementById('doughnutChart2');
const data2 = {
  labels: [
    'Solar',
    'Wind',
    'Diesel'
  ],
  datasets: [{
    label: 'kWh',
    data: [solar_kwh, wind_kwh, diesel_kwh],
    backgroundColor: [
      '#FDDA0D',
      '#0096FF',
      '#8B8000'
    ],
    hoverOffset: 4
  }]
};

const config_category_sources_all_sources = {
  type: 'doughnut',
  data: data2,
  options: {
    layout: {
            padding: {
                bottom: 20
            }
        },
    responsive: true,
    maintainAspectRatio: true,
  }
};

new Chart(all_sources, config_category_sources_all_sources);




