const min = 0;
const max = 1000
const delta = 30;

export function createGaugeChart({ containerId, gaugeData }) {

  const centerI = Math.round(gaugeData.data[1].value * 1) / 1
  const value = Math.round(gaugeData.data[0].value * 1) / 1

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
          text: '%maxs',
          align: 'center',
          verticalAlign: 'middle',
          style_fontSize: 40
        },
        ...(gaugeData.xAxisTitle ? [
          {
            verticalAlign: 'bottom',
            text: gaugeData.xAxisTitle ? gaugeData.xAxisTitle : "",
            style: { fontSize: 13 }
          },
        ] : [])

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
            { value: [min, centerI - delta], color: gaugeData.scale[0].color },
            { value: [centerI - delta, centerI + delta], color: gaugeData.scale[1].color },
            { value: [centerI + delta, max], color: gaugeData.scale[2].color },
          ]
        },
        points: [['x', [min, value ? value : 0]]]
      }
    ],
    annotations: !gaugeData.showScale ? [] : [
      {
        label: {
          text: `Tiempo de reacción de <span style="color: ${gaugeData.data[0].color};">${gaugeData.data[0].name}</span> con respecto a <span style="color: ${gaugeData.data[1].color}">${gaugeData.data[1].name}</span><br>
                 <span style="color: ${gaugeData.scale[0].color};">●</span> ${gaugeData.scale[0].name} 
                 <span style="color: ${gaugeData.scale[1].color};">●</span> ${gaugeData.scale[1].name} 
                 <span style="color: ${gaugeData.scale[2].color};">●</span> ${gaugeData.scale[2].name}`,
          style_fontSize: 14,
          style_color: '#424242',
          align: 'center',
        },
        position: 'bottom center',
        margin: 10,
      }
    ]
  });
  return chart
}

