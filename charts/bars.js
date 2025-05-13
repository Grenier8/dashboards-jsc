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

export function createGroupedBarsChart({ containerId, title, groupedBarsData }) {
    const chart = JSC.chart(containerId, {
        debug: false,
        type: 'column',
        legend: {
            position: 'top left',
            template: '%icon %name - %values',
        },
        title_label: {
            text: title ? title : "",
            style_fontSize: 17
        },
        title_position: 'center',
        yAxis_defaultTick_label_text: '%value',
        xAxis: {
            label_text: groupedBarsData.xAxisTitle,
            categories: groupedBarsData.categories
        },
        yAxis: {
            label_text: groupedBarsData.yAxisTitle,
        },
        series: groupedBarsData.series.map(bd => ({
            defaultPoint: groupedBarsData.defaultPoint,
            name: bd.name,
            points: bd.values,
            color: bd.color,
        }))
    });

    return chart;
}