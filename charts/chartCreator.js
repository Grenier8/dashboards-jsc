import { createCalendarChart } from "./datePicker.js";
import { createBarsChart, createGroupedBarsChart } from "./bars.js";
import { createGaugeChart, createGaugeChart2 } from "./gauge.js";
import { createLineChart } from "./line.js";
import { createRadarChart } from "./radar.js";
import { createPointChart } from "./point.js";
import { createBubbleChart } from "./bubble.js";
import { createRingChart } from "./rings.js";

export function datePickerChart(containerId, inputId) {
  createCalendarChart({ containerId, inputId });
}

export function radarChart({
  containerId,
  summaryData,
  userName,
  categoryName,
}) {
  if (!summaryData) {
    setNoDataText(containerId);
    return;
  }

  var radarData = {
    maxValues: {
      MOT: summaryData[1].MOT,
      RT: summaryData[1].RT,
      VP: summaryData[1].PV,
    },
    data: [
      {
        Name: userName,
        MOT: summaryData[0].MOT,
        RT: summaryData[0].RT,
        VP: summaryData[0].PV,
      },
      {
        Name: categoryName,
        MOT: summaryData[1].MOT,
        RT: summaryData[1].RT,
        VP: summaryData[1].PV,
      },
    ],
  };

  createRadarChart({ containerId, radarData });
}

export function motChart({ containerId, motData, categoryName }) {
  if (!motData) {
    setNoDataText(containerId);
    return;
  }

  const barsData = {
    yAxisTitle: "Puntos",
    defaultPoint: {
      tooltip: `Promedio de puntos obtenidos<br>por <span style="color: %color">%name</span>`,
    },
    series: [
      {
        name: motData[0].NombreCompleto,
        values: motData[0].TotalUserMot,
        color: "#00BCD4",
      },
      {
        name:
          motData[0].CategoriaNombre == ""
            ? categoryName
            : motData[0].CategoriaNombre,
        values: motData[0].TotalMOT,
        color: "#3F51B5",
      },
    ],
  };

  createBarsChart({ containerId, barsData });
}

export function allRankingCharts({ containerIds, allRankingData }) {
  const palette = [
    "#A5A9E2",
    "#F6B0C1",
    "#FDC58B",
    "#FAE183",
    "#CDE7B0",
    "#8dd0ca",
  ];

  rankingChart({
    containerId: containerIds[0],
    rankingData: {
      Modo: allRankingData.data[0].Modo,
      players: allRankingData.data[0].players
        .sort((a, b) => b.name.localeCompare(a.name))
        .map((p) => ({
          name: p.name,
          value: p.value,
          color: palette[allRankingData.data[0].players.indexOf(p)],
        })),
    },
  });
  rankingChart({
    containerId: containerIds[1],
    rankingData: {
      Modo: allRankingData.data[1].Modo,
      players: allRankingData.data[1].players
        .sort((a, b) => b.name.localeCompare(a.name))
        .map((p) => ({
          name: p.name,
          value: p.value,
          color: palette[allRankingData.data[1].players.indexOf(p)],
        })),
    },
  });

  rankingChart({
    containerId: containerIds[2],
    rankingData: {
      Modo: allRankingData.data[2].Modo,
      players: allRankingData.data[2].players
        .sort((a, b) => b.name.localeCompare(a.name))
        .map((p) => ({
          name: p.name,
          value: p.value,
          color: palette[allRankingData.data[2].players.indexOf(p)],
        })),
    },
  });
}

export function rankingChart({ containerId, rankingData }) {
  if (!rankingData) {
    setNoDataText(containerId);
    return;
  }

  const barsData = {
    horizontal: true,
    borderColor: "#0474c4",
    title: {
      text: "Ranking General - Modalidad " + rankingData.Modo,
      align: "left",
    },
    defaultPoint: {
      tooltip: `<b>%value</b> - Puntos obtenidos<br>por <b><span style="color: %color">%name</span></b>`,
    },
    series: rankingData.players
      .sort((a, b) => a.value - b.value)
      .map((bd) => ({
        name: bd.name,
        values: bd.value,
        color: bd.color,
      })),
    onBarLabel: true,
    xAxisSpacingPercentage: 0.2,
  };

  createBarsChart({ containerId, barsData });
}

export function allQuartileCharts({ containerIds, allQuartileData }) {
  quartileChart({
    containerId: containerIds[0],
    quartileData: allQuartileData.data[0],
  });
  quartileChart({
    containerId: containerIds[1],
    quartileData: allQuartileData.data[1],
  });
  quartileChart({
    containerId: containerIds[2],
    quartileData: allQuartileData.data[2],
  });
}

export function quartileChart({ containerId, quartileData }) {
  if (!quartileData) {
    setNoDataText(containerId);
    return;
  }

  const palette = ["#ffd8d8", "#fff2d9", "#ffffd9", "#d7ead7", "#d7ead7"];

  const barsData = {
    defaultPoint: {
      tooltip: `<b>%value</b> - Puntos obtenidos<br>en modalidad <b><span style="color: %color">%name</span></b>`,
    },
    series: [
      {
        name: quartileData.Modo,
        values: quartileData.Valor,
        color: "#558df1",
      },
    ],
    onBarLabel: true,
    xAxisSpacingPercentage: 0.2,
    ...(quartileData.Modo == "Simple" ? { yAxisTitle: "Efectividad" } : {}),
    yTicks: quartileData.Ranges.map((r) => ({
      value: r,
      color: palette[quartileData.Ranges.indexOf(r)],
    })),
  };

  createBarsChart({ containerId, barsData });
}

export function allAttemptsCharts({ containerIds, allAttemptsData }) {
  attemptsChart({
    containerId: containerIds[0],
    attemptsData: allAttemptsData.data[0],
  });
  attemptsChart({
    containerId: containerIds[1],
    attemptsData: allAttemptsData.data[1],
  });
  attemptsChart({
    containerId: containerIds[2],
    attemptsData: allAttemptsData.data[2],
  });
}

export function attemptsChart({ containerId, attemptsData }) {
  if (!attemptsData) {
    setNoDataText(containerId);
    return;
  }

  const palette = ["#cbe4ae", "#8ed1cb", "#8dd7f8", "#5794fa"];

  const names = ["Primero", "Segundo", "Tercero", "Cuarto"];

  const barsData = {
    borderColor: "#0474c4",
    title: { text: "Modalidad " + attemptsData.Modo, align: "left" },
    defaultPoint: {
      tooltip: `<b>%value</b> - Puntos obtenidos<br>en el intento <b><span style="color: %color">%name</span></b>`,
    },
    series: attemptsData.Attempts.map((bd) => ({
      values: bd,
      color: palette[attemptsData.Attempts.indexOf(bd)],
      name: names[attemptsData.Attempts.indexOf(bd)],
    })),
    onBarLabel: true,
    xAxisTitle: {
      text: "Intentos",
      color: "#0474c4",
    },
    yAxisTitle: "ms",
    xAxisSpacingPercentage: 0.2,
  };

  createBarsChart({ containerId, barsData });
}

export function pvChart({ containerId, pvData }) {
  if (!pvData) {
    setNoDataText(containerId);
    return;
  }

  const lineData = {
    xAxisTitle: "Pelota",
    yAxisTitle: "Tiempo en el aire (s)",
    data: [
      {
        name: pvData[0].NombreCompleto,
        data: Object.values(JSON.parse(pvData[0].JsonPoints)[0]).map(
          (y, index) => ({
            x: String.fromCharCode(65 + index),
            y: y,
          })
        ),
        color: "#00BCD4",
      },
      {
        name:
          pvData[1].CategoriaNombre == ""
            ? "Primera"
            : pvData[1].CategoriaNombre,
        data: Object.values(JSON.parse(pvData[1].JsonPoints)[0]).map(
          (y, index) => ({
            x: String.fromCharCode(65 + index),
            y: y,
          })
        ),
        color: "#3F51B5",
      },
    ],
  };

  createLineChart({ containerId, lineData });
}

export function pvChart2({ containerId, pvData, categoryName }) {
  if (!pvData) {
    setNoDataText(containerId);
    return;
  }
  const userPoints = Object.values(JSON.parse(pvData[0].JsonPoints)[0]);
  const allUsersPoints = Object.values(JSON.parse(pvData[1].JsonPoints)[0]);

  const barsData = {
    xAxisTitle: "Número de pelota",
    categories: Array.from(
      { length: Math.max(userPoints.length, allUsersPoints.length) },
      (_, i) => `${i + 1}`
    ),
    yAxisTitle: "Tiempo en el aire (s)",
    series: [
      {
        name: pvData[0].NombreCompleto,
        values: Object.values(JSON.parse(pvData[0].JsonPoints)[0]),
        color: "#00BCD4",
      },
      {
        name: categoryName,
        values: Object.values(JSON.parse(pvData[1].JsonPoints)[0]),
        color: "#3F51B5",
      },
    ],
    defaultPoint: {
      tooltip: `Número de pelota: <b>%xValue</b><br>Tiempo en el aire: <b>%yValue s</b>`,
    },
  };

  createGroupedBarsChart({ containerId, groupedBarsData: barsData });
}

export function pvChart3({ containerId, pvData }) {
  if (!pvData) {
    setNoDataText(containerId);
    return;
  }

  const pointData = {
    xAxisTitle: "Pelota",
    yAxisTitle: "Tiempo en el aire (s)",
    data: [
      {
        name: pvData[0].NombreCompleto,
        data: Object.values(JSON.parse(pvData[0].JsonPoints)[0]).map(
          (y, index) => ({
            x: String.fromCharCode(65 + index),
            y: y,
          })
        ),
        color: "#00BCD4",
        figure: "circle",
        defaultPoint: {
          tooltip: `<span style="color: %color;">${pvData[0].NombreCompleto}</span><br>Pelota: <b>%xValue</b><br>Tiempo en el aire: <b>%yValue s</b>`,
        },
      },
      {
        name:
          pvData[1].CategoriaNombre == ""
            ? "Primera"
            : pvData[1].CategoriaNombre,
        data: Object.values(JSON.parse(pvData[1].JsonPoints)[0]).map(
          (y, index) => [String.fromCharCode(65 + index), y]
        ),
        color: "#3F51B5",
        figure: "circle",
        defaultPoint: {
          tooltip: `<span style="color: %color;">${
            pvData[1].CategoriaNombre == ""
              ? "Primera"
              : pvData[1].CategoriaNombre
          }</span><br>Pelota: <b>%xValue</b><br>Tiempo en el aire: <b>%yValue s</b>`,
        },
      },
    ],
  };

  createPointChart({ containerId, pointData });
}

export function allRTCharts({ containerIds, allRTData }) {
  rtChart({ containerId: containerIds[0], rtData: allRTData.data[0] });
  rtChart({ containerId: containerIds[1], rtData: allRTData.data[1] });
  rtChart({ containerId: containerIds[2], rtData: allRTData.data[2] });
}

function rtChart({ containerId, rtData }) {
  if (!rtData) {
    setNoDataText(containerId);
    return;
  }

  const gaugeData = {
    mode: rtData.Modo.charAt(0).toUpperCase() + rtData.Modo.slice(1),
    score: rtData.Valor,
    ranges: rtData.Ranges,
    scale: [
      {
        name: "Mejor",
        color: "#75e6b3",
      },
      {
        name: "Similar",
        color: "#ffd11e",
      },
      {
        name: "Peor",
        color: "#fc5353",
      },
    ],
  };

  createGaugeChart2({ containerId, gaugeData });
}

export function allBubbleCharts({ containerIds, allBubbleData }) {
  bubbleChart({
    containerId: containerIds[0],
    bubbleData: allBubbleData.data[0],
  });
  bubbleChart({
    containerId: containerIds[1],
    bubbleData: allBubbleData.data[1],
  });
  bubbleChart({
    containerId: containerIds[2],
    bubbleData: allBubbleData.data[2],
  });
}

export function bubbleChart({ containerId, bubbleData }) {
  createBubbleChart({ containerId, bubbleData });
}

function setNoDataText(containerId) {
  const heading = document.createElement("h4");
  heading.textContent = "No hay datos para este jugador";

  const container = document.getElementById(containerId);
  container.innerHTML = "";
  container.appendChild(heading);
}

export function ringChart({ containerId, rtData }) {
  if (!rtData) {
    setNoDataText(containerId);
    return;
  }

  const ringData = {
    data: rtData.data.map((r) => {
      return {
        mode: r.Modo.charAt(0).toUpperCase() + r.Modo.slice(1),
        value: r.Valor,
        name: r.Nombre,
      };
    }),
  };

  createRingChart({ containerId, ringData });
}
