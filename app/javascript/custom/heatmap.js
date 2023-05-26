const hourly_kwh = gon.hourly_kwh_usage
document.addEventListener('DOMContentLoaded', renderMap());

function renderMap(){
    ej.base.registerLicense('Mgo+DSMBaFt+QHFqVkFrWE5GfkBAXWFKblV8QWtTelhgFChNYlxTR3ZcQFRiQH5XdkVlW3lY;Mgo+DSMBPh8sVXJ1S0d+X1ZPckBAVXxLflF1VWVTe1Z6cVNWACFaRnZdQV1gS3dSf0VnWX9Yc31T;ORg4AjUWIQA/Gnt2VFhhQlJDfVtdX2tWfFN0RnNfdVp4flBAcDwsT3RfQF5jSnxad0xjXX9ednFUQA==;MTU0MjM0N0AzMjMxMmUzMTJlMzMzN0hOZmxLN1VYQmI0Nnl0TzJQRWtFVEpDZnVwaHdMNkNqcFh1cVRoNFdXc1E9;MTU0MjM0OEAzMjMxMmUzMTJlMzMzN2RHaXo5RkhhWWhnd2x6T2MwRkxORE9PK0RLOVhublg3V1plNHZUeUZQbnM9;NRAiBiAaIQQuGjN/V0d+XU9HcVRGQmFBYVF2R2BJeVR0fF9DZkwxOX1dQl9gSX1Rf0RqWXtecHNVQmY=;MTU0MjM1MEAzMjMxMmUzMTJlMzMzN0tZcm05UktTdE9KdHFNQkdRdlloNHFGSEVRQTBqbURaV1FGUExoODZhN0U9;MTU0MjM1MUAzMjMxMmUzMTJlMzMzN0tWTUZxWnA5dzZGenVHdmc4eGpwL1NQb2h5NFEySTF1bXpYdi9uUXB1ZHc9;Mgo+DSMBMAY9C3t2VFhhQlJDfVtdX2tWfFN0RnNfdVp4flBAcDwsT3RfQF5jSnxad0xjXX9ed3FdQA==;MTU0MjM1M0AzMjMxMmUzMTJlMzMzN2kxcndseGVxWkdCT2xocHBaL212dmxNSlc3U2RQbUxtSXFHVlBvWENYY0U9;MTU0MjM1NEAzMjMxMmUzMTJlMzMzN2thQVc0TDBtM3JmUnB2WVFYNHRrN2FvSDQvMVVNQUkrdjV2REpSNjZLMjQ9;MTU0MjM1NUAzMjMxMmUzMTJlMzMzN0tZcm05UktTdE9KdHFNQkdRdlloNHFGSEVRQTBqbURaV1FGUExoODZhN0U9');
    var heatmapData = [
     [null,null],
     [null,null],
     [null,null],
     [null,null],
     [null,null],
     [null,null],
     [null,null],
     [null,null],
     [null,null],
     [null,null],
     [null,null],
        [null,null]];

    var hours_per_meridiem = 12

    for (let i = 0; i < hourly_kwh.length; i++){
        if (i < 12){
           heatmapData[i][1] = Math.round(hourly_kwh[i].total)
     }
        else {
             heatmapData[i-hours_per_meridiem][0] = Math.round(hourly_kwh[i].total)
             }
    }   
    var heatmap = new ej.heatmap.HeatMap({
        titleSettings: {
            text: 'Community Electricity Usage',
            textStyle: {
                size: '24px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Poppins'
            }
        },
         cellSettings: {
            showLabel: true,
            format: `{value}`,
            border:{
                width:0
            },
            textStyle: {
                size: '14px',
                fontFamily: 'Poppins'
            }
        },
        xAxis: {
            labels: ['12-1', '1-2', '2-3', '3-4', '4-5', 
                        '5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12'],
            opposedPosition: true,
            textStyle: {
                size: '16px',
                fontFamily: 'Poppins'
            }
        },
        yAxis: {
            labels: ['PM', 'AM'],
            textStyle: {
                size: '16px',
                fontFamily: 'Poppins'
            }
        },
        renderingMode: 'SVG',
        //Might want to change these values based on monthly or seasonaly maxs
        paletteSettings:{
            emptyPointColor: '#FFFFFF',
            palette: [{ startValue: 1500, endValue:1800, minColor: '#FFFFDA', maxColor:'#EDF8B6' },
            { startValue: 1800, endValue:2100, minColor: '#CAE8B4', maxColor:'#78D1BD' },
            { startValue: 2100, endValue:2400, minColor: '#36BCC6', maxColor:'#208FC6' },
            { startValue: 2400, endValue:2700, minColor: '#208FC6', maxColor:'#000080' },
            //{ startValue: 2300, endValue:2500, minColor: '#000080', maxColor:'#152238' }
            ],
            type: 'Gradient'
        },
        tooltipSettings:{
            fill: '#265259',
            textStyle: {
                color: '#FFFFFF',
                size: '12px',
                fontFamily: 'Poppins'
            },
            border:{
                width:1,
                color: '#98BABF'
            }
        },
        tooltipRender: function (args) {
            args.content = ['From ' + args.xLabel + ' ' + args.yLabel +', '+ args.value + 'kWh were used.'];
        },
     dataSource: heatmapData, 
      legendSettings: {
            position: 'Top',
            showLabel: true,
            height: "75",
            labelFormat: '{value}',
            title: {
                text: 'Kilowatt Hour (kWh)',
            textStyle: {
                size: '14px',
                fontFamily: 'Poppins'
            }
            },
        },
        showTooltip:true,  
        
}, '#heatmap');
}

function kwh_usage(kwh){
    console.log(kwh)
    let kwh_int = parseInt(kwh,10)
    console.log(kwh_int)
    let low = 2100
    let high = 2700
    if (kwh < low){
        return "Low"
    } else if (low < kwh < high ){
        return "Average"
    } else{
        return "High"
    }
};