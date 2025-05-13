import { createCalendarChart } from "./datePicker.js";
import { createBarsChart, createGroupedBarsChart } from "./bars.js";
import { createGaugeChart } from "./gauge.js";
import { createLineChart } from "./line.js";
import { createRadarChart } from "./radar.js";
import { createPointChart } from "./point.js";

export function datePickerChart(containerId, inputId) {
    createCalendarChart({ containerId, inputId })
}

export function radarChart({ containerId, summaryData, userName, categoryName }) {
    if (!summaryData) {
        setNoDataText(containerId)
        return;
    }

    var radarData = {
        maxValues: {
            "MOT": summaryData[1].MOT,
            "RT": summaryData[1].RT,
            "VP": summaryData[1].PV,
        },
        data: [
            {
                "Name": userName,
                "MOT": summaryData[0].MOT,
                "RT": summaryData[0].RT,
                "VP": summaryData[0].PV,
            },
            {
                "Name": categoryName,
                "MOT": summaryData[1].MOT,
                "RT": summaryData[1].RT,
                "VP": summaryData[1].PV,
            }
        ]
    }

    createRadarChart({ containerId, radarData })
}

export function motChart({ containerId, motData, categoryName }) {
    if (!motData) {
        setNoDataText(containerId)
        return;
    }

    const barsData = {
        yAxisTitle: 'Puntos',
        defaultPoint: {
            tooltip:
                `Promedio de puntos obtenidos<br>por <span style="color: %color">%name</span>`,
        },
        series: [
            {
                name: motData[0].NombreCompleto,
                values: motData[0].TotalUserMot,
                color: '#00BCD4',
            },
            {
                name: motData[0].CategoriaNombre == "" ? categoryName : motData[0].CategoriaNombre,
                values: motData[0].TotalMOT,
                color: '#3F51B5',
            }
        ]
    }

    createBarsChart({ containerId, barsData })
}

export function pvChart({ containerId, pvData }) {
    if (!pvData) {
        setNoDataText(containerId)
        return;
    }

    const lineData =
    {
        xAxisTitle: 'Pelota',
        yAxisTitle: 'Tiempo en el aire (s)',
        data: [
            {
                name: pvData[0].NombreCompleto,
                data: Object.values(JSON.parse(pvData[0].JsonPoints)[0]).map((y, index) => ({
                    x: String.fromCharCode(65 + index),
                    y: y
                })),
                color: '#00BCD4',
            },
            {
                name: pvData[1].CategoriaNombre == "" ? 'Primera' : pvData[1].CategoriaNombre,
                data: Object.values(JSON.parse(pvData[1].JsonPoints)[0]).map((y, index) => ({
                    x: String.fromCharCode(65 + index),
                    y: y
                })),
                color: '#3F51B5',
            },
        ]
    }

    createLineChart({ containerId, lineData })

}

export function pvChart2({ containerId, pvData, categoryName }) {
    if (!pvData) {
        setNoDataText(containerId)
        return;
    }
    const userPoints = Object.values(JSON.parse(pvData[0].JsonPoints)[0]);
    const allUsersPoints = Object.values(JSON.parse(pvData[1].JsonPoints)[0]);

    const barsData = {
        xAxisTitle: 'Número de pelota',
        categories: Array.from({ length: Math.max(userPoints.length, allUsersPoints.length) }, (_, i) => `${i + 1}`),
        yAxisTitle: 'Tiempo en el aire (s)',
        series: [
            {
                name: pvData[0].NombreCompleto,
                values: Object.values(JSON.parse(pvData[0].JsonPoints)[0]),
                color: '#00BCD4',
            },
            {
                name: categoryName,
                values: Object.values(JSON.parse(pvData[1].JsonPoints)[0]),
                color: '#3F51B5',
            }
        ],
        defaultPoint: {
            tooltip:
                `Número de pelota: <b>%xValue</b><br>Tiempo en el aire: <b>%yValue s</b>`,
        },
    }

    createGroupedBarsChart({ containerId, groupedBarsData: barsData })

}

export function pvChart3({ containerId, pvData }) {
    if (!pvData) {
        setNoDataText(containerId)
        return;
    }

    const pointData =
    {
        xAxisTitle: 'Pelota',
        yAxisTitle: 'Tiempo en el aire (s)',
        data: [
            {
                name: pvData[0].NombreCompleto,
                data: Object.values(JSON.parse(pvData[0].JsonPoints)[0]).map((y, index) => ({
                    x: String.fromCharCode(65 + index),
                    y: y
                })),
                color: '#00BCD4',
            },
            {
                name: pvData[1].CategoriaNombre == "" ? 'Primera' : pvData[1].CategoriaNombre,
                data: Object.values(JSON.parse(pvData[1].JsonPoints)[0]).map((y, index) => ([
                    String.fromCharCode(65 + index),
                    y
                ]
                )),
                color: '#3F51B5',
            },
        ]
    }

    createPointChart({ containerId, pointData })

}

export function allRTCharts({ containerIds, allRTData }) {
    rtChart({ containerId: containerIds[0], rtData: [allRTData[0], allRTData[1]] });
    rtChart({ containerId: containerIds[1], rtData: [allRTData[2], allRTData[3]], showScale: true });
    rtChart({ containerId: containerIds[2], rtData: [allRTData[4], allRTData[5]] });
}

function rtChart({ containerId, rtData, showScale }) {
    if (!rtData) {
        setNoDataText(containerId)
        return;
    }

    const gaugeData = {
        title: rtData[0].Modo.charAt(0).toUpperCase() + rtData[0].Modo.slice(1),
        data: [
            {
                name: rtData[0].NombreCompleto,
                value: rtData[0].Score,
                color: '#00BCD4',
            },
            {
                name: rtData[1].CategoriaNombre == "" ? "Primera" : rtData[1].CategoriaNombre,
                value: rtData[1].Score,
                color: '#3F51B5',
            }
        ],
        scale: [{
            name: 'Mejor',
            color: '#26A69A',
        },
        {
            name: 'Similar',
            color: '#FFB74D',
        },
        {
            name: 'Peor',
            color: '#D32F2F',
        }],
        showScale: showScale,
    }

    createGaugeChart({ containerId, gaugeData })
}

function setNoDataText(containerId) {
    const heading = document.createElement("h4");
    heading.textContent = "No hay datos para este jugador"

    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.appendChild(heading)
}