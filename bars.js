function createBarsChart({ containerId, title, barsData }) {
    const chart = JSC.chart(containerId, {
        debug: false,
        type: 'column',
        legend_visible: false,
        title_label: {
            text: title ? title : "",
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
                palette: ['#3F51B5', '#00BCD4'],
                points: barsData
            }
        ]
    });

    return chart;
}

const barsData = [
    {
        name: 'Primera Division',
        y: 8,
    },
    {
        name: 'Jugador 1',
        y: 2,
    }
]

const barsChart = createBarsChart({ containerId: 'barsDiv', barsData: barsData })
