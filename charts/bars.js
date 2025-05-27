export function createBarsChart({ containerId, barsData }) {
    const chart = JSC.chart(containerId, {
        debug: false,
        type: barsData.horizontal ? 'horizontalColumn' : 'column',
        legend_visible: false,
        title_label: {
            text: barsData.title ? barsData.title : "",
            style_fontSize: 15,
            style_fontWeight: 'bold',
            style_width: "100%",
            align: 'center'
        },
        title_position: 'center',
        yAxis_defaultTick_label_text: '%value',
        xAxis: {
            spacingPercentage: barsData.xAxisSpacingPercentage ? barsData.xAxisSpacingPercentage : 0.6
        },
        yAxis: {
            label_text: barsData.yAxisTitle,
        },
        series: [
            {
                defaultPoint: barsData.defaultPoint,
                name: barsData.yAxisTitle,
                palette: barsData.series.map(bd => bd.color),
                points: barsData.series.map(bd => ({ name: bd.name, y: bd.values, label: barsData.onBarLabel ? { text: '%value', style_fontSize: 12, style_fontWeight: 'bold', offset: [-40, 0] } : undefined })),
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