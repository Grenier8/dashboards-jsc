function createGaugeChart({ containerId, title, value }) {
  var chart = JSC.chart(containerId, {
    debug: false,
    legend_visible: false,
    defaultTooltip_enabled: false,
    title: {
      label_text: title ? title : "",
      position: 'center',
    },
    title_label: {
      style_fontSize: 17
    },
    xAxis_spacingPercentage: 0.4,
    yAxis: [
      {
        id: 'ax1',
        defaultTick: {
          padding: 10,
          enabled: false
        },
        customTicks: [350, 600, 700, 850],
        line: {
          width: 10,

          /*Defining the option will enable it.*/
          breaks: {},

          /*Palette is defined at series level with an ID referenced here.*/
          color: 'smartPalette:pal1'
        },
        scale_range: [350, 850]
      }
    ],
    defaultSeries: {
      type: 'gauge column roundcaps',
      shape: {
        label: {
          text: '%max',
          align: 'center',
          verticalAlign: 'middle',
          style_fontSize: 28
        }
      }
    },
    series: [
      {
        type: 'column roundcaps',
        name: 'Temperatures',
        yAxis: 'ax1',
        palette: {
          id: 'pal1',
          pointValue: '%yValue',
          ranges: [
            { value: 350, color: '#26A69A' },
            { value: 600, color: '#FFB74D' },
            { value: [700, 850], color: '#D32F2F' },
          ]
        },
        points: [['x', [350, value]]]
      }
    ]
  });
  return chart
}

const gaugeChart1 = createGaugeChart({ containerId: "gauge1Div", title: 'Gonogo', value: 560 })
const gaugeChart2 = createGaugeChart({ containerId: "gauge2Div", title: 'Simple', value: 620 })
const gaugeChart3 = createGaugeChart({ containerId: "gauge3Div", title: 'Stroop', value: 710 })
