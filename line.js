function createLineChart({ containerId, title, lineData }) {
    const chart = JSC.chart(containerId, {
        debug: true,
        type: 'line',
        legend: {
            position: 'top left',
            template: '%icon %name - %values',
        },
        palette: ['#3F51B5', '#00BCD4'],
        title_label: {
            text: title ? title : "",
            style_fontSize: 17
        },
        xAxis: {
            crosshair_enabled: true,
            scale: { type: 'linear', interval: 1 },
            label_text: "Número de pelota"
        },
        yAxis: {
            label_text: "Tiempo en el aire (s)"
        },
        defaultSeries: {
            defaultPoint_marker: {
                type: 'circle',
                size: 8,
                fill: 'white',
                outline: { width: 2, color: 'currentColor' }
            }
        },
        title_label_text: 'Costs (Last 6 Months)',
        series: lineData.map(ld => ({ name: ld.name, points: ld.data }))
    });

    return chart
}

const lineData = [
    {
        name: "Primera Division",
        data: [
            { x: 1, y: 19 },
            { x: 2, y: 20 },
            { x: 3, y: 21 },
            { x: 4, y: 21 },
            { x: 5, y: 21 },
            { x: 6, y: 21 },
            { x: 7, y: 21 },
            { x: 8, y: 20 },
            { x: 9, y: 21 },
            { x: 10, y: 20 },
            { x: 11, y: 20 },
        ]
    },
    {
        name: "Jugador 1",
        data: [
            { x: 1, y: 21 },
            { x: 2, y: 21 },
            { x: 3, y: 22 },
            { x: 4, y: 22 },
            { x: 5, y: 22 },
            { x: 6, y: 22 },
            { x: 7, y: 21 },
            { x: 8, y: 19 },
            { x: 9, y: 19 },
            { x: 10, y: 19 },
            { x: 11, y: 18 },
        ]
    },
]

const lineChart = createLineChart({ containerId: "lineDiv", lineData: lineData })

