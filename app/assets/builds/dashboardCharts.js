(() => {
  // app/javascript/dashboardCharts.js
  var windKwh;
  var solarKwh;
  var dieselKwh;
  function getChartData() {
    return fetch("/dashboard_data.json").then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then((json) => {
      windKwh = json.wind_kwh;
      solarKwh = json.solar_kwh;
      dieselKwh = json.diesel_kwh;
      return { success: true };
    }).catch((e) => {
      console.log("There was a problem with the fetch operation: " + e.message);
      return { success: false, error: e.message };
    });
  }
  function drawDoughnutChart() {
    const elecGenMainChart = document.getElementById("elecGenMainChart");
    const elecGenOverviewChart = document.getElementById("elecGenOverviewChart");
    const generationData = {
      labels: ["Solar", "Wind", "Diesel"],
      datasets: [
        {
          borderWidth: 0.25,
          label: "kWh",
          data: [solarKwh, windKwh, dieselKwh],
          backgroundColor: ["#FDDA0D", "#0096FF", "#8B8000"],
          hoverOffset: 4
        }
      ]
    };
    const configElecGen = {
      type: "doughnut",
      data: generationData,
      options: {
        layout: {
          padding: {
            bottom: 20
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    };
    if (window.genChartMainObj)
      window.genChartMainObj.destroy();
    if (window.genChartOverviewObj)
      window.genChartOverviewObj.destroy();
    window.genChartMainObj = new Chart(elecGenMainChart, configElecGen);
    window.genChartOverviewObj = new Chart(elecGenOverviewChart, configElecGen);
  }
  function loadCharts() {
    getChartData().then((result) => {
      if (result.success) {
        drawDoughnutChart();
      } else {
        console.log("Failed to fetch data:", result.error);
      }
    });
  }
  document.addEventListener("turbo:load", (event) => {
    const rootPath = "/";
    const url = new URL(event.detail.url);
    if (url.pathname == rootPath) {
      const elecGenMainChart = document.getElementById("elecGenMainChart");
      const elecGenOverviewChart = document.getElementById(
        "elecGenOverviewChart"
      );
      if (elecGenMainChart && elecGenOverviewChart) {
        loadCharts();
      }
    }
  });
  window.addEventListener("resize", () => {
    drawDoughnutChart();
  });
})();
//# sourceMappingURL=/assets/dashboardCharts.js.map
