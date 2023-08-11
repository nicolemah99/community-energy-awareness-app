import $ from 'jquery';
import ApexCharts from 'apexcharts';

const DATA_URL = "/dashboard_data.json";
const labels = ["Solar", "Wind", "Diesel"];
const windColor = "#0095ffb3";
const solarColor = "#8b7f00b3";
const dieselColor = "#fdd90db3";
let windKwh, solarKwh, dieselKwh;
let mainChart, overviewChart;

// Fetch Data from API using jQuery ajax
function getChartData(callback) {
    return $.ajax({
        url: "/dashboard_data.json",
        dataType: "json"
    })
        .done(function (json) {
            windKwh = json.wind_kwh;
            solarKwh = json.solar_kwh;
            dieselKwh = json.diesel_kwh;
            if (typeof callback === "function") {
                callback();
            }
            return { success: true };
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("There was a problem with the fetch operation: " + errorThrown);
            return { success: false, error: errorThrown };
        });
}
// Create an ApexChart
function createChart(elementId, options) {
    let chartDiv = $(`#${elementId}`);
    // Set existing chart to chart being created
    let existingChart = elementId === "elecGenMain" ? mainChart : overviewChart;

    // If the "existing chart" exists, destroy before we create a new one
    if (existingChart) {
        existingChart.destroy();
    }

    let newChart = new ApexCharts(chartDiv[0], options);
    newChart.render();

    // Assign the newly created chart to the appropriate variable
    if (elementId === "elecGenMain") {
        mainChart = newChart;
    } else {
        overviewChart = newChart;
    }

}

// Process Data and Set up Charts
function setUpCharts() {
    const chartMainOptions = {
        series: [windKwh, solarKwh, dieselKwh],
        labels: labels,
        colors: [dieselColor, windColor, solarColor],
        legend: {
            show: true,
            fontSize: "16px",
            position: "top",
            onItemClick: {
                toggleDataSeries: false,
            },
        },
        chart: {
            width: "550px",
            type: "donut",
            redrawOnWindowResize: true,
            redrawOnParentResize: true,
            selection: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false,
            },
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    size: "45%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                        },
                        value: { show: true, formatter: (value) => `${value} kWh` },
                        total: {
                            show: true,
                            color: "black",
                            formatter: function (w) {
                                return `${w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b;
                                }, 0)} kWh`;
                            },
                        },
                    },
                },
            },
        },
    };

    const chartOverviewOptions = {
        series: [windKwh, solarKwh, dieselKwh],
        labels: labels,
        colors: [dieselColor, windColor, solarColor],
        legend: {
            show: true,
            fontSize: "16px",
            position: "bottom",
            onItemClick: {
                toggleDataSeries: false,
            },
        },
        chart: {
            width: "350px",
            type: "donut",
            redrawOnWindowResize: true,
            redrawOnParentResize: true
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false,
            },
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    size: "45%",
                },
            },
        },
    };

    createChart("elecGenMain", chartMainOptions);
    createChart("elecGenOverview", chartOverviewOptions);
}


// Start process once document is ready
document.addEventListener("turbo:load", function () {
    // If we are on the home page, then process the data
    if (window.location.pathname === "/") {
        getChartData(setUpCharts);
    }
});
