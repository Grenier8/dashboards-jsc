export function createBubbleChart({ containerId, bubbleData }) {
    const chart = JSC.chart(containerId, {
        type: 'bubble',
        legend_visible: false,
        defaultSeries: {
          defaultPoint: {
            label_text: '%name',
          }
        },
        xAxis: {
          scale: { range: [200, 800] },
          label_text: 'ms',
          markers: [{
            value: [bubbleData.Min, bubbleData.Max],
            color: '#e6e9fb',
          }],
          defaultTick: {
            label: { style_fontSize: 11 },
          },
          customTicks: [
            {
              value: bubbleData.Min,
              label: { text: `${bubbleData.Min}` },
            },
            {
              value: bubbleData.Max,
              label: { text: `${bubbleData.Max}` },
            }
          ],
        },
        yAxis: {
          scale: { range: [0, 1] },
          label:{
            text: bubbleData.Modo,
            padding: [0, 0, 20, 0]
          },
          defaultTick: {
            enabled: false
          },
          customTicks: [
            {
              value: 0,
              label: { text: '' },
            },
            {
              value: 1,
              label: { text: '' },
            }
          ],
        },
        series: [{
          name: bubbleData.Modo,
          size:{
            max: 40,
            min: 30
          },
          points: [{
            name: bubbleData.Valor,
            x: bubbleData.Valor,
            y: 0.5,
            z:35,
            color: '#d18cc1'
          }]
        }]
      });

    return chart;
}