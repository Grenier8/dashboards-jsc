import { createCalendarChart } from "./datePicker.js";
import { createBarsChart, createGroupedBarsChart } from "./bars.js";
import { createGaugeChart } from "./gauge.js";
import { createLineChart } from "./line.js";
import { createRadarChart } from "./radar.js";

export function datePickerChart(containerId, inputId) {
    createCalendarChart({ containerId, inputId })
}

export function radarChart({ containerId, summaryData }) {
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
                "Name": "Usuario",
                "MOT": summaryData[0].MOT,
                "RT": summaryData[0].RT,
                "VP": summaryData[0].PV,
            },
            {
                "Name": "Primera",
                "MOT": summaryData[1].MOT,
                "RT": summaryData[1].RT,
                "VP": summaryData[1].PV,
            }
        ]
    }

    createRadarChart({ containerId, radarData })
}

export function motChart({ containerId, motData }) {
    if (!motData) {
        setNoDataText(containerId)
        return;
    }

    const barsData = [
        {
            name: motData[0].NombreCompleto,
            y: motData[0].TotalUserMot,
        },
        {
            name: 'Primera',
            y: motData[0].TotalMOT,
        }
    ]

    createBarsChart({ containerId, barsData })
}

export function pvChart({ containerId, pvData }) {
    if (!pvData) {
        setNoDataText(containerId)
        return;
    }

    const lineData = [
        {
            name: pvData[0].NombreCompleto,
            data: Object.values(JSON.parse(pvData[0].JsonPoints)[0]).map((y, index) => ({
                x: index + 1,
                y: y
            }))
        },
        {
            name: pvData[1].NombreCompleto,
            data: Object.values(JSON.parse(pvData[1].JsonPoints)[0]).map((y, index) => ({
                x: index + 1,
                y: y
            }))
        },
    ]

    createLineChart({ containerId, lineData })

}

export function pvChart2({ containerId, pvData }) {
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
                points: Object.values(JSON.parse(pvData[0].JsonPoints)[0]),
                color: '#00BCD4',
            },
            {
                name: 'Primera',
                points: Object.values(JSON.parse(pvData[1].JsonPoints)[0]),
                color: '#3F51B5',
            }
        ]
    }

    createGroupedBarsChart({ containerId, groupedBarsData: barsData })

}

export function allRTCharts({ containerIds, allRTData }) {
    rtChart({ containerId: containerIds[0], rtData: [allRTData[0], allRTData[1]] });
    rtChart({ containerId: containerIds[1], rtData: [allRTData[2], allRTData[3]] });
    rtChart({ containerId: containerIds[2], rtData: [allRTData[4], allRTData[5]] });
}

function rtChart({ containerId, rtData }) {
    if (!rtData) {
        setNoDataText(containerId)
        return;
    }

    const gaugeData = {
        title: rtData[0].Modo.charAt(0).toUpperCase() + rtData[0].Modo.slice(1),
        center: rtData[1].Score,
        value: rtData[0].Score
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