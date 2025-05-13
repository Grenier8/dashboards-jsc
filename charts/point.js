export function createLineChart({ containerId, lineData }) {
    const chart = JSC.chart(containerId, {
        debug: false,
        type: 'line',
        legend: {
            position: 'top left',
            template: '%icon %name - %values',
        },
        palette: lineData.data.map(ld => ld.color),
        title_label: {
            text: lineData.title ? lineData.title : "",
            style_fontSize: 17
        },
        xAxis: {
            label_text: lineData.xAxisTitle
        },
        yAxis: {
            label_text: lineData.yAxisTitle,
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
        series: lineData.data.map(ld => ({ name: ld.name, points: ld.data }))
    });

    return chart
}

export function createPointChart({ containerId, pointData }) {
    var chart = JSC.chart(containerId, {
        debug: false,
        type: 'marker',
        title_label: {
            text: pointData.title ? pointData.title : "",
            style_fontSize: 17
        },
        legend_visible: false,
        defaultSeries: {
            opacity: 0.7,
            defaultPoint_marker: { size: 40 }
        },
        xAxis: {
            label_text: pointData.xAxisTitle
        },
        yAxis: {
            label_text: pointData.yAxisTitle,
        },
        series: pointData.data.map(ld => ({ defaultPoint_marker_type: 'circle', name: ld.name, points: ld.data, color: ld.color }))
    })

    return chart;
}
