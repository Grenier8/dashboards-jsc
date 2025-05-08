export function createLineChart({ containerId, title, lineData }) {
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



