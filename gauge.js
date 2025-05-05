var chart = JSC.chart('chartDiv', {
  debug: true,
  legend_visible: false,
  defaultTooltip_enabled: false,
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
          { value: 350, color: '#77E6B4' },
          { value: 600, color: '#FFD221' },
          { value: [700, 850], color: '#FF5353' },
        ]
      },
      points: [['x', [350, 560]]]
    }
  ]
}); 