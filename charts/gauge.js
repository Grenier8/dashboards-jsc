const min = 0;
const max = 1000
const delta = 30;

export function createGaugeChart({ containerId, gaugeData }) {
  const centerI = Math.round(gaugeData.center * 1) / 1
  const value = Math.round(gaugeData.value * 1) / 1

  var chart = JSC.chart(containerId, {
    debug: false,
    legend_visible: false,
    defaultTooltip_enabled: false,
    title: {
      label_text: gaugeData.title ? gaugeData.title : "",
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
        customTicks: [min, centerI - delta, centerI + delta, max],
        line: {
          width: 10,

          /*Defining the option will enable it.*/
          breaks: {},

          /*Palette is defined at series level with an ID referenced here.*/
          color: 'smartPalette:pal1'
        },
        scale_range: [min, max]
      }
    ],
    defaultSeries: {
      type: 'gauge column roundcaps',
      shape: {
        label: [{
          text: '%max',
          align: 'center',
          verticalAlign: 'middle',
          style_fontSize: 28
        },
        {
          verticalAlign: 'bottom',
          text: 'Tiempo promedio (s)',
          style: { fontSize: 13 }
        },
        ]
      }
    },
    series: [
      {
        type: 'column roundcaps',
        name: 'Tiempo',
        yAxis: 'ax1',
        palette: {
          id: 'pal1',
          pointValue: '%yValue',
          ranges: [
            { value: [min, centerI - delta], color: '#26A69A' },
            { value: [centerI - delta, centerI + delta], color: '#FFB74D' },
            { value: [centerI + delta, max], color: '#D32F2F' },
          ]
        },
        points: [['x', [min, value ? value : 0]]]
      }
    ]
  });
  return chart
}

