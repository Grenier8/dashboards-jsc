import * as ChartCreator from "./charts/chartCreator.js";
import { getMOTInfo, getRadarInfo, getUsersByTenant, getPVInfo, getRTInfo, getQuartileData } from "./service/service.js";

//Varibles
const startInput = document.getElementById("startDateInput");
const endInput = document.getElementById("endDateInput");

const startPopup = document.getElementById("startDatePopup");
const endPopup = document.getElementById("endDatePopup");

const userDropdown = document.getElementById("userSelect");

const initiateUserSelect = async () => {
    const userSelect = document.getElementById(userDropdown.id);

    const users = await getUsersByTenant(tenantId);
    const sortedUsers = users.sort((a, b) => {
        if (a.Nombre < b.Nombre) return -1;
        if (a.Nombre > b.Nombre) return 1;
        return 0;
    });

    sortedUsers.forEach(user => {
        const option = document.createElement('option');
        option.value = user.ID;
        option.textContent = user.Nombre;
        userSelect.appendChild(option);
    });
    userSelect.value = '';
}

const initiateDatePickers = () => {
    startInput.addEventListener("click", () => {
        showPopup(startInput, startPopup);
    });

    endInput.addEventListener("click", () => {
        showPopup(endInput, endPopup);
    });

    function showPopup(input, popup) {
        const rect = input.getBoundingClientRect();
        popup.style.left = rect.left + "px";
        popup.style.top = rect.bottom + window.scrollY + "px";
        popup.style.display = "block";
    }

    startInput.addEventListener("click", () => {
        showPopup(startInput, startPopup);
    });

    endInput.addEventListener("click", () => {
        showPopup(endInput, endPopup);
    });

    document.addEventListener("click", (e) => {
        if (!startPopup.contains(e.target) && e.target !== startInput) {
            startPopup.style.display = "none";
        }
        if (!endPopup.contains(e.target) && e.target !== endInput) {
            endPopup.style.display = "none";
        }
    });
}

const handleSubmit = async () => {
    const startDate = startInput.value
    const endDate = endInput.value;
    const userId = userDropdown.value;
    const userName = userDropdown.options[userDropdown.selectedIndex].textContent;

    ChartCreator.radarChart({ containerId: "radarDiv", summaryData: await getRadarInfo(startDate, endDate, userId, tenantId), userName, categoryName: "Primera" });
    ChartCreator.motChart({ containerId: 'barsDiv', motData: await getMOTInfo(startDate, endDate, userId, tenantId), categoryName: "Primera" })
    ChartCreator.pvChart3({ containerId: "lineDiv", pvData: await getPVInfo(startDate, endDate, userId, tenantId), categoryName: "Primera" })
    ChartCreator.allRTCharts({ containerIds: ["gauge1Div", "gauge2Div", "gauge3Div"], allRTData: await getRTInfo(startDate, endDate, userId, tenantId) })
}



//Setup
const tenantId = 17;
// await initiateUserSelect(17);
// initiateDatePickers();
// ChartCreator.datePickerChart(startPopup.id, startInput.id)
// ChartCreator.datePickerChart(endPopup.id, endInput.id)

// document.getElementById("filter-form").addEventListener("submit", function (event) {
//     event.preventDefault();

//     handleSubmit();
// });

// document.getElementById("startDateInput").value = "01-01-2020"

ChartCreator.allQuartileCharts({ containerIds: ["quartile1Div", "quartile2Div", "quartile3Div"], allQuartileData: await getQuartileData("2020-01-01", "2026-01-01", 0, tenantId) })