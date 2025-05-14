export function createPointChart({ containerId, pointData }) {
    var chart = JSC.chart(containerId, {
        debug: false,
        type: 'marker',
        title_label: {
            text: pointData.title ? pointData.title : "",
            style_fontSize: 17
        },
        legend: {
            position: 'top left',
            template: '%icon %name - %values',
        },
        defaultSeries: {
            defaultPoint_marker: { size: 20 }
        },
        xAxis: {
            label_text: pointData.xAxisTitle
        },
        yAxis: {
            label_text: pointData.yAxisTitle,
        },
        series: pointData.data.map(ld => ({ defaultPoint: ld.defaultPoint, defaultPoint_marker_type: ld.figure, name: ld.name, points: ld.data, color: ld.color }))
    })

    return chart;
}
