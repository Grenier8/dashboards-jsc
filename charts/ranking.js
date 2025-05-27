export function createBarsChart({ containerId, barsData }) {
    const chart = JSC.chart(containerId, {
        debug: false,
        type: barsData.horizontal ? 'horizontalColumn' : 'column',
        legend_visible: false,
        title_label: {
            text: barsData.title ? barsData.containerIdtitle : "",
            style_fontSize: 17
        },
        title_position: 'center',
        yAxis_defaultTick_label_text: '%value',
        xAxis: {
            spacingPercentage: 0.6
        },
        yAxis: {
            label_text: barsData.yAxisTitle,
        },
        series: [
            {
                defaultPoint: barsData.defaultPoint,
                name: barsData.yAxisTitle,
                palette: barsData.series.map(bd => bd.color),
                points: barsData.series.map(bd => ({ name: bd.name, y: bd.values }))
            }
        ]
    });

    return chart;
}
