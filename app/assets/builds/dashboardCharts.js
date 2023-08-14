(() => {
  // app/javascript/dashboardCharts.js
  document.addEventListener("turbo:load", (event) => {
    const rootPath = "/";
    const url = new URL(event.detail.url);
    if (url.pathname == rootPath) {
      const elecGenMainChart2 = document.getElementById("elecGenMainChart");
      const elecGenOverviewChart2 = document.getElementById(
        "elecGenOverviewChart"
      );
      if (elecGenMainChart2 && elecGenOverviewChart2) {
        loadCharts();
      }
    }
  });
  window.addEventListener("resize", () => {
  });
})();
//# sourceMappingURL=/assets/dashboardCharts.js.map
