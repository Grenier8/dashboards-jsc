

export function createGaugeChart({ containerId, gaugeData }) {
  const min = 0;
const max = 1000
const delta = 30;

  const centerI = Math.round(gaugeData.data[1].value * 1) / 1
  const value = Math.round(gaugeData.data[0].value * 1) / 1

  var chart = JSC.chart(containerId, {
    debug: false,
    legend_visible: false,
    title: {
      label_text: gaugeData.title ? gaugeData.title : "",
      position: 'center',
    },
    title_label: {
      style_fontSize: 17
    },
    // xAxis: {
    //   defaultTick: {
    //     label: { text: '%value', padding: -30, onTop: true, color: gaugeData.data[0].color },
    //   },
    // },
    xAxis_spacingPercentage: 0.4,
    yAxis: [
      {
        id: 'ax1',
        defaultTick: {
          padding: 10,
          enabled: false
        },
        // customTicks: [min, centerI - delta, centerI + delta, max],
        customTicks: [
          {
            value: centerI,
            label: { text: `${gaugeData.data[1].name} - ${centerI}s`, style_fontSize: 15 },
            label_color: gaugeData.data[1].color,

          }
        ],
        line: {
          width: 10,

          /*Defining the option will enable it.*/
          breaks: {
            custom: [(centerI - delta) / max, (centerI + delta) / max],
          },

          /*Palette is defined at series level with an ID referenced here.*/
          color: 'smartPalette:pal1'
        },
        scale_range: [min, max]
      }
    ],
    defaultSeries: {
      type: 'gauge column roundcaps',
      defaultPoint_tooltip:
        getTooltipText(gaugeData, centerI, value),
      shape: {
        label: [{
          text: `%maxs<br>`,
          align: 'center',
          verticalAlign: 'middle',
          style_fontSize: 30
        },
        {
          text: gaugeData.data[0].name,
          color: gaugeData.data[0].color,
          align: 'center',
          verticalAlign: 'middle',
          margin: [8, 0, 0, 0],
          style_fontSize: 15
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
        points: [[gaugeData.data[0].name, [min, value ? value : 0]]]
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

export function createGaugeChart2({ containerId, gaugeData }) {
console.log(gaugeData);

const min = gaugeData.ranges[0];
const max = gaugeData.ranges[gaugeData.ranges.length - 1];

  var chart = JSC.chart(containerId, {
    debug: false,
    legend_visible: false,
    title: {
      label_text: gaugeData.title ? gaugeData.title : "",
      position: 'center',
    },
    title_label: {
      style_fontSize: 17
    },
    // xAxis: {
    //   defaultTick: {
    //     label: { text: '%value', padding: -30, onTop: true, color: gaugeData.data[0].color },
    //   },
    // },
    xAxis_spacingPercentage: 0.4,
    yAxis: [
      {
        id: 'ax1',
        defaultTick: {
          padding: 10,
          enabled: false
        },
        // customTicks: [min, centerI - delta, centerI + delta, max],
        // customTicks: gaugeData.ranges.map(r => ({ value: r })),
        // customTicks: [
        //   {
        //     value: centerI,
        //     label: { text: `${gaugeData.data[1].name} - ${centerI}s`, style_fontSize: 15 },
        //     label_color: gaugeData.data[1].color,

        //   }
        // ],
        line: {
          width: 10,

          /*Defining the option will enable it.*/
          // breaks: {
          //   custom: gaugeData.ranges.map(r => r / max),
          // },

          /*Palette is defined at series level with an ID referenced here.*/
          color: 'smartPalette:pal1'
        },
        scale_range: [gaugeData.ranges[0], gaugeData.ranges[gaugeData.ranges.length - 1]]
      }
    ],
    defaultSeries: {
      type: 'gauge column roundcaps',
      defaultPoint_tooltip:
       "ssss",
      shape: {
        label: [{
          text: `%maxs<br>`,
          align: 'center',
          verticalAlign: 'middle',
          style_fontSize: 30
        },
        {
          text: gaugeData.name,
          color: "red",
          align: 'center',
          verticalAlign: 'middle',
          margin: [8, 0, 0, 0],
          style_fontSize: 15
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
            { value: 350, color: '#FF5353' }, 
            { value: 600, color: '#FFD221' }, 
            { value: 700, color: '#77E6B4' }, 
            { value: [800, 850], color: '#21D683' } 
          ]
        },
        points: [['x', [350, 720]]] 
      }
    ],
    // annotations: !gaugeData.showScale ? [] : [
    //   {
    //     label: {
    //       text: `Tiempo de reacción de <span style="color: ${gaugeData.data[0].color};">${gaugeData.data[0].name}</span> con respecto a <span style="color: ${gaugeData.data[1].color}">${gaugeData.data[1].name}</span><br>
    //              <span style="color: ${gaugeData.scale[0].color};">●</span> ${gaugeData.scale[0].name} 
    //              <span style="color: ${gaugeData.scale[1].color};">●</span> ${gaugeData.scale[1].name} 
    //              <span style="color: ${gaugeData.scale[2].color};">●</span> ${gaugeData.scale[2].name}`,
    //       style_fontSize: 14,
    //       style_color: '#424242',
    //       align: 'center',
    //     },
    //     position: 'bottom center',
    //     margin: 10,
    //   }
    // ]
  });
  return chart
}

function getTooltipText(gaugeData, center, value) {
  const symbol = value < center - delta ? '<' : value > center + delta ? '>' : '~'
  const comparisonText = value < center - delta ? `<span style="color: ${gaugeData.scale[0].color};">● ${gaugeData.scale[0].name}</span>` : value > center + delta ? `<span style="color: ${gaugeData.scale[2].color};">● ${gaugeData.scale[2].name}</span>` : `<span style="color: ${gaugeData.scale[1].color};">● ${gaugeData.scale[1].name}</span>`
  return `${comparisonText}<br><span style="color: ${gaugeData.data[0].color};">${gaugeData.data[0].name}</span> - ${value} ${symbol} ${center} - <span style="color: ${gaugeData.data[1].color};">${gaugeData.data[1].name}</span>`
}

function getIntervals(ranges){
  const intervals = [];
  for (let i = 0; i < ranges.length - 1; i++) {
    intervals.push([ranges[i], ranges[i + 1]]);
  }
  
  return intervals;
}