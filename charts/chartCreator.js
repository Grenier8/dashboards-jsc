import { createCalendarChart } from "./datePicker.js";
import { createBarsChart } from "./bars.js";
import { createGaugeChart } from "./gauge.js";
import { createLineChart } from "./line.js";
import { createRadarChart } from "./radar.js";

export function datePickerChart(containerId, inputId) {
    createCalendarChart({ containerId, inputId })
}

export function radarChart({ containerId, summaryData }) {
    if (!summaryData) {
        document.getElementById(containerId).innerHTML = "No hay datos para este jugador"
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
        document.getElementById(containerId).innerHTML = "No hay datos para este jugador"
        return;
    }

    const barsData = [
        {
            name: motData[0].CategoriaNombre,
            y: motData[0].TotalMOT,
        },
        {
            name: motData[0].NombreCompleto,
            y: motData[0].TotalUserMot,
        }
    ]

    createBarsChart({ containerId, barsData })
}

export function pvChart({ containerId, pvData }) {
    if (!pvData) {
        document.getElementById(containerId).innerHTML = "No hay datos para este jugador"
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

export function allRTCharts({ containerIds, allRTData }) {
    rtChart({ containerId: containerIds[0], rtData: [allRTData[0], allRTData[1]] });
    rtChart({ containerId: containerIds[1], rtData: [allRTData[2], allRTData[3]] });
    rtChart({ containerId: containerIds[2], rtData: [allRTData[4], allRTData[5]] });
}

function rtChart({ containerId, rtData }) {
    if (!rtChart) {
        document.getElementById(containerId).innerHTML = "No hay datos para este jugador"
        return;
    }

    const title = rtData[0].Modo.charAt(0).toUpperCase() + rtData[0].Modo.slice(1);
    const center = rtData[1].Score;
    const value = rtData[0].Score;

    createGaugeChart({ containerId, title, center, value })
}