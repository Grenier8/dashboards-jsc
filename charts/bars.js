export function createBarsChart({ containerId, barsData }) {
    console.log(barsData)
    console.log(barsData.yTicks.slice(0, -1).map((b, i) => ({
        value: [b.value, barsData.yTicks[i+1].value],
        fill: b.color,
        opacity: 0.7,
        zIndex: -1
      })))
    const chart = JSC.chart(containerId, {
        debug: false,
        box:{
            outline:{
                visible:barsData.borderColor,
                color:barsData.borderColor
            }
        },
        type: barsData.horizontal ? 'horizontalColumn' : 'column',
        legend_visible: false,
        title_label: {
            text: barsData.title ? barsData.title.text : "",
            style_fontSize: 15,
            style_fontWeight: 'bold',
            style_width: "100%",
        },
        title_position: barsData.title ? barsData.title.align : "center",
        yAxis_defaultTick_label_text: '%value',
        xAxis: {
            spacingPercentage: barsData.xAxisSpacingPercentage ? barsData.xAxisSpacingPercentage : 0.6
        },
        yAxis: {
            label_text: barsData.yAxisTitle,
            scale: barsData.yTicks ? {
                range: [Math.min(...barsData.yTicks.map(t => t.value)), Math.max(...barsData.yTicks.map(t => t.value))]
            } : undefined,
            customTicks: barsData.yTicks ? barsData.yTicks.map(t => ({ value: t.value})) : undefined,
            markers: barsData.yTicks.slice(0, -1).map((b, i) => ({
                value: [b.value, barsData.yTicks[i+1].value],
                color: b.color,
              }))
        },
        series: [
            {
                defaultPoint: barsData.defaultPoint,
                name: barsData.yAxisTitle,
                palette: barsData.series.map(bd => bd.color),
                points: barsData.series.map(bd => ({ name: bd.name, y: bd.values, label: barsData.onBarLabel ? { text: '%value', style_fontSize: 12, style_fontWeight: 'bold', style_color: '#000',placement: 'inside' } : undefined })),
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