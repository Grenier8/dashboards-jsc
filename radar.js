var chart;
var player1 = 'James Harden HOU',
    player2 = 'Giannis Antetokounmpo MIL';
var palette = ['#3F51B5', '#00BCD4'];
var maxValues = {};

// Reemplaza este arreglo con los datos JSON del CSV
var nbaData = [
    {
        "Player": "James Harden",
        "Tm": "HOU",
        "Points": 34.3,
        "Rebounds": 6.6,
        "Assists": 7.5,
        "Field Goal": 0.44,
        "3-Point FG": 0.35
    },
    {
        "Player": "Giannis Antetokounmpo",
        "Tm": "MIL",
        "Points": 29.5,
        "Rebounds": 13.6,
        "Assists": 5.6,
        "Field Goal": 0.553,
        "3-Point FG": 0.304
    },
    // ... agrega más jugadores si es necesario
];

calculateMaxValues(nbaData);
chart = renderChart(nbaData);

function renderChart(data) {
    return JSC.chart('chartDiv', {
        type: 'radar area',
        legend_visible: false,
        animation_duration: 500,
        title_label: {
            text: 'NBA Player Comparison',
            style_fontSize: 17
        },
        palette: palette,
        yAxis: {
            alternateGridFill: 'none',
            scale_range: [0, 1],
            defaultTick_label_visible: false
        },
        xAxis_defaultTick: {
            line_visible: false,
            label_width: 80
        },
        defaultSeries_mouseTracking_enabled: false,
        defaultPoint_marker: {
            type: 'circle',
            outline_width: 0
        },
        series: makeSeries(data, player1, player2),
        toolbar_defaultItem_position: 'inside top',
        toolbar_items: {
            dropdown1: {
                type: 'select',
                value: player1,
                items: makePlayersArray(data).join(','),
                events_change: function (val) {
                    player1 = val;
                    var series = makeSeries(data, val, player2);
                    chart.options({ series: series });
                },
                itemsBox_outline_width: 0,
                fill: palette[0],
                radius: 20,
                outline_width: 0,
                label_color: 'white',
                states_hover: {
                    fill: palette[0],
                    outline_width: 0
                }
            },
            label: {
                label_text: 'VS.',
                boxVisible: false,
                margin: 4
            },
            dropdown2: {
                type: 'select',
                value: player2,
                items: makePlayersArray(data).join(','),
                events_change: function (val) {
                    player2 = val;
                    var series = makeSeries(data, player1, val);
                    chart.options({ series: series });
                },
                itemsBox_outline_width: 0,
                fill: palette[1],
                radius: 20,
                outline_width: 0,
                label_color: 'white',
                states_hover: {
                    fill: palette[1],
                    outline_width: 0
                }
            }
        }
    });
}

function calculateMaxValues(data) {
    'Points,Rebounds,Assists,Field Goal,3-Point FG'
        .split(',')
        .map(function (n) {
            maxValues[n] = JSC.max(nbaData, n);
        });
}

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