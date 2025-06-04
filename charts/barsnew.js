export function createBarsChartNew({ containerId, barsData }) {
    const containerHeight = document.getElementById(containerId).offsetHeight - 55;
    const chartRange = 100 - 65;
    const pixelsPerPoint = containerHeight / chartRange;
    console.log("pixelsPerPoint: " + pixelsPerPoint);
   const chart = JSC.chart(containerId, {
    type: 'column',
    legend_visible: false,
    yAxis: {
      defaultTick: { line: { visible: false } },
      scale: { range: [65, 100] },
      label_text: 'Efectividad',
    //   customTicks: [
    //     { value: 65, gridLine:{visible:false} },
    //     { value: (86.2+65)/2,label:{text:""},gridLine:{color:'#fdd6d6',width:(86.2-65)*pixelsPerPoint} },
    //     { value: 86.2, gridLine: { visible:false} },
    //     { value: (90+86.2)/2,label:{text:""},gridLine:{color:'#fff2d9',width:(90-86.2)*pixelsPerPoint} },
    //     { value: 90, gridLine: {visible:false} },
    //     { value: (92.58+90)/2,label:{text:""},gridLine:{color:'#ffffd9',width:(92.58-90)*pixelsPerPoint} },
    //     { value: 92.58, gridLine: {visible:false} },
    //     { value: (100+92.58)/2,label:{text:""},gridLine:{color:'#d7ead7',width:(100-92.58)*pixelsPerPoint} },
    //     { value: 100, gridLine: {visible:false} }
    //   ]
    customTicks: [
        { value: 65 },
        { value: (86.2+65)/2 },
        { value: 86.2 },
        { value: (90+86.2)/2 },
        { value: 90 },
        { value: (92.58+90)/2 },
        { value: 92.58 },
        { value: (100+92.58)/2 },
        { value: 100 }
      ],
      markers:[
        { value: [65, 86.2], fill: '#fdd6d6', opacity: 0.7 },
        { value: 86.2, fill: '#fff2d9', opacity: 0.7 },
        { value: 90, fill: '#ffffd9', opacity: 0.7 },
        { value: 92.58, fill: '#d7ead7', opacity: 0.7 },
        { value: 100, fill: '#d7ead7', opacity: 0.7 }
      ]
    },
    xAxis: {
      defaultTick: { label: { style: { fontWeight: 'bold' } } }
    },
    series: [{
      points: [{
        name: 'Simple',
        y: 92.67,
        label_text: '<b>92.67</b>',
        label_placement: 'outside',
        label_offset: -20,
        color: 'dodgerblue'
      }]
    }]
  });

  return chart;
}