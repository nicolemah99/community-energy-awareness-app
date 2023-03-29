ej.base.registerLicense('Mgo+DSMBaFt+QHFqVkFrWE5GfkBAXWFKblV8QWtTelhgFChNYlxTR3ZcQFRiQH5XdkVlW3lY;Mgo+DSMBPh8sVXJ1S0d+X1ZPckBAVXxLflF1VWVTe1Z6cVNWACFaRnZdQV1gS3dSf0VnWX9Yc31T;ORg4AjUWIQA/Gnt2VFhhQlJDfVtdX2tWfFN0RnNfdVp4flBAcDwsT3RfQF5jSnxad0xjXX9ednFUQA==;MTU0MjM0N0AzMjMxMmUzMTJlMzMzN0hOZmxLN1VYQmI0Nnl0TzJQRWtFVEpDZnVwaHdMNkNqcFh1cVRoNFdXc1E9;MTU0MjM0OEAzMjMxMmUzMTJlMzMzN2RHaXo5RkhhWWhnd2x6T2MwRkxORE9PK0RLOVhublg3V1plNHZUeUZQbnM9;NRAiBiAaIQQuGjN/V0d+XU9HcVRGQmFBYVF2R2BJeVR0fF9DZkwxOX1dQl9gSX1Rf0RqWXtecHNVQmY=;MTU0MjM1MEAzMjMxMmUzMTJlMzMzN0tZcm05UktTdE9KdHFNQkdRdlloNHFGSEVRQTBqbURaV1FGUExoODZhN0U9;MTU0MjM1MUAzMjMxMmUzMTJlMzMzN0tWTUZxWnA5dzZGenVHdmc4eGpwL1NQb2h5NFEySTF1bXpYdi9uUXB1ZHc9;Mgo+DSMBMAY9C3t2VFhhQlJDfVtdX2tWfFN0RnNfdVp4flBAcDwsT3RfQF5jSnxad0xjXX9ed3FdQA==;MTU0MjM1M0AzMjMxMmUzMTJlMzMzN2kxcndseGVxWkdCT2xocHBaL212dmxNSlc3U2RQbUxtSXFHVlBvWENYY0U9;MTU0MjM1NEAzMjMxMmUzMTJlMzMzN2thQVc0TDBtM3JmUnB2WVFYNHRrN2FvSDQvMVVNQUkrdjV2REpSNjZLMjQ9;MTU0MjM1NUAzMjMxMmUzMTJlMzMzN0tZcm05UktTdE9KdHFNQkdRdlloNHFGSEVRQTBqbURaV1FGUExoODZhN0U9');
var heatmapData = [
     [73, 39, 26, 39, 94, 0],
     [93, 58, 53, 38, 26, 68],
     [99, 28, 22, 4, 66, 90],
     [14, 26, 97, 69, 69, 3],
     [7, 46, 47, 47, 88, 6],
     [41, 55, 73, 23, 3, 79],
     [56, 69, 21, 86, 3, 33],
     [45, 7, 53, 81, 95, 79],
     [60, 77, 74, 68, 88, 51],
     [25, 25, 10, 12, 78, 14],
     [25, 56, 55, 58, 12, 82],
     [74, 33, 88, 23, 86, 59]];

var heatmap = new ej.heatmap.HeatMap({
     titleSettings: {
            text: 'Sales Revenue per Employee (in 1000 US$)',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
         cellSettings: {
            showLabel: true,
        },
        xAxis: {
            labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 
                        'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin',   'Mario'],
        },
        yAxis: {
            labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        },
     dataSource: heatmapData, 
      legendSettings: {
            position: 'Right',
            showLabel: true,
            height: "150"
        },
        showTooltip:true,  
        
}, '#element');