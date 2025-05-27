
export async function getUsersByTenant(tenantId) {
    return await getDatabaseInfo("USER", "01-01-2000", "01-01-2026", 0, tenantId);
}

export async function getRadarInfo(startDate, endDate, userId, tenantId) {
    return await getDatabaseInfo("RADAR", startDate, endDate, userId, tenantId);
}

export async function getRTInfo(startDate, endDate, userId, tenantId) {
    return await getDatabaseInfo("RT", startDate, endDate, userId, tenantId);
}

export async function getMOTInfo(startDate, endDate, userId, tenantId) {
    return await getDatabaseInfo("MOT", startDate, endDate, userId, tenantId);
}

export async function getPVInfo(startDate, endDate, userId, tenantId) {
    const r = await getDatabaseInfo("VP", startDate, endDate, userId, tenantId);
    return r;
}

export function getRankingData(startDate, endDate, userId, tenantId) {
    return {
        data:[
            {
                name: "Ivanna Parra",
                value: 360
            },
            {
                name: "Maria Tejeda",
                value: 369
            },
            {
                name: "Sofia Garcia",
                value: 409
            },
            {
                name: "Maria Agudelo",
                value: 413
            },
            {
                name: "Isabella Amado Diaz",
                value: 415
            }
        ],
        modalidad: "Simple"
    }
}

const getDatabaseInfo = async (mode, startDate, endDate, userId, tenantId) => {
    try {
        const response = await fetch('http://dev.avattar.cl/api/RAADRPT/GetData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _Modo: mode,
                _finicio: startDate,
                _ffin: endDate,
                _userid: userId,
                _tenantid: tenantId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    };

}