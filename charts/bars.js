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
            label_text: "Puntos",
        },
        series: [
            {
                defaultPoint: {
                    tooltip:
                        '<b>%yValue</b> of users have<br>access to <b>%name</b>',
                },
                name: 'Users with access',
                palette: ['#00BCD4', '#3F51B5'],
                points: barsData
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
        series: groupedBarsData.series
    });

    return chart;
}