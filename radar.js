function createRadarChart({ containerId, title, radarData }) {
  var palette = ['#3F51B5', '#00BCD4'];

  const chart = JSC.chart(containerId, {
    type: 'radar polar area',
    legend_visible: true,
    legend: {
      position: "bottom",
      template: '%icon %name'
    },
    animation_duration: 500,
    title_label: {
      text: title ? title : "",
      style_fontSize: 17
    },
    title_position: 'center',
    palette: palette,
    yAxis: {
      alternateGridFill: 'none',
      scale_range: [0, 1],
      defaultTick_label_visible: false
    },
    defaultSeries_mouseTracking_enabled: true,
    defaultPoint_marker: { type: 'circle', outline_width: 0 },
    series: makeSeries(),

  });


  function makeSeries() {
    player1Data = radarData.data[0];
    player2Data = radarData.data[1];

    return [
      {
        name: player1Data.Player,
        id: 'Player 1',
        shape_fill: ['#B0BEC5', 0.5],
        points: [
          {
            name: makeTicks(player1Data, player2Data, 'RT'),
            y: normalizeValue(player1Data, 'RT'),
            id: 'RT1'
          },
          {
            name: makeTicks(player1Data, player2Data, 'VP'),
            y: normalizeValue(player1Data, 'VP'),
            id: 'VP1'
          },
          {
            name: makeTicks(player1Data, player2Data, 'MOT'),
            y: normalizeValue(player1Data, 'MOT'),
            id: 'MOT1'
          },
        ]
      },
      {
        name: player2Data.Player,
        id: 'Player 2',
        shape_fill: ['#B0BEC5', 0.5],
        points: [
          {
            name: makeTicks(player1Data, player2Data, 'RT'),
            y: normalizeValue(player2Data, 'RT'),
            id: 'RT2'
          },
          {
            name: makeTicks(player1Data, player2Data, 'VP'),
            y: normalizeValue(player2Data, 'VP'),
            id: 'VP2'
          },
          {
            name: makeTicks(player1Data, player2Data, 'MOT'),
            y: normalizeValue(player2Data, 'MOT'),
            id: 'MOT2'
          },
        ]
      }
    ];
  }

  function normalizeValue(data, value) {
    return data[value] / radarData.maxValues[value];
  }
  function makeTicks(player1Data, player2Data, type) {
    return (
      '<span style="color:' +
      palette[0] +
      '; font-size:14px"><b>' +
      player1Data[type] +
      '</b></span><span style="color:#E0E0E0; width:8px; align:center">/</span>' +
      '<span style="color:' +
      palette[1] +
      '; font-size:14px"><b>' +
      player2Data[type] +
      '</b></span><br><span style="color:#424242">' +
      type +
      '</span>'
    );
  }

  function makePlayersArray(data) {
    return data.map(function (a) {
      return a.Player;
    });
  }

  return chart;
}

var gaugeData = {
  maxValues: {
    "MOT": 1,
    "RT": 1,
    "VP": 1,
  },
  data: [
    {
      "Player": "Primera Division",
      "MOT": 1,
      "RT": 1,
      "VP": 1,
    },
    {
      "Player": "Jugador 1",
      "MOT": 0.7,
      "RT": 1,
      "VP": 0,
    }
  ]
}

const radarChart = createRadarChart({ containerId: "radarDiv", radarData: gaugeData })



