var chart1 = JSC.chart('chart1Div', {
  debug: true,
  legend_visible: false,
  defaultTooltip_enabled: false,
  title: {
    label_text: 'Gonogo',
    position: 'center'
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
      points: [['x', [350, 560]]]
    }
  ]
});

var chart2 = JSC.chart('chart2Div', {
  debug: true,
  legend_visible: false,
  defaultTooltip_enabled: false,
  xAxis_spacingPercentage: 0.4,
  title: {
    label_text: 'Simple',
    position: 'center'
  },
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
      points: [['x', [350, 620]]]
    }
  ]
});

var chart3 = JSC.chart('chart3Div', {
  debug: true,
  legend_visible: false,
  defaultTooltip_enabled: false,
  xAxis_spacingPercentage: 0.4,
  title: {
    label_text: 'Stroop',
    position: 'center'
  },
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
      points: [['x', [350, 710]]]
    }
  ]
}); 