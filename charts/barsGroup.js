// JS 
var chart = JSC.chart('chartDiv', {
    debug: true,
    defaultSeries_type: 'column',
    title_label_text: 'Acme Tool Sales',
    yAxis: { label_text: 'Units Sold' },
    xAxis: {
        label_text: 'Quarter',
        categories: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    series: [
        {
            name: 'Primera',
            points: [230, 240, 267, 238]
        },
        {
            name: 'Hammer',
            points: [325, 367, 382, 371]
        },
        {
            name: 'Grinder',
            points: [285, 292, 267, 218]
        },
        {
            name: 'Drill',
            points: [185, 192, 198, 248]
        }
    ]
}); 