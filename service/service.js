
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
                Modo:"Simple",
                players:[
                    {
                        name: "Felipe Esquivel",
                        value: 344
                    },
                    {
                        name: "Mateo Martinez",
                        value: 347
                    },
                    {
                        name: "Thomas de Martis",
                        value: 348
                    },
                    {
                        name: "Misael Valero",
                        value: 354
                    },
                    {
                        name: "Elian Ojeda",
                        value: 363
                    },
                    {
                        name: "Agustin Martinez",
                        value: 566
                    }
                ]
            },{
                Modo:"Stroop",
                players:[
                    {
                        name: "Felipe Esquivel",
                        value: 496
                    },
                    {
                        name: "Mateo Martinez",
                        value: 403
                    },
                    {
                        name: "Thomas de Martis",
                        value: 401
                    },
                    {
                        name: "Misael Valero",
                        value: 408
                    },
                    {
                        name: "Elian Ojeda",
                        value: 409
                    },
                    {
                        name: "Agustin Martinez",
                        value: 473
                    }
                ]
            },{
                Modo:"GoNoGo",
                players:[
                    {
                        name: "Felipe Esquivel",
                        value: 399
                    },
                    {
                        name: "Mateo Martinez",
                        value: 276
                    },
                    {
                        name: "Thomas de Martis",
                        value: 345
                    },
                    {
                        name: "Misael Valero",
                        value: 380
                    },
                    {
                        name: "Elian Ojeda",
                        value: 444
                    },
                    {
                        name: "Agustin Martinez",
                        value: 442
                    }
                ]
            }
        ]
    }
}

export function getBubbleData(startDate, endDate, userId, tenantId) {
    return {
        data:[
            {
                Modo: "Simple",
                Valor: 424,
                Min: 297,
                Max: 665,
            },
            {
                Modo: "Stroop",
                Valor: 506,
                Min: 382,
                Max: 734,
            },
            {
                Modo: "GoNoGo",
                Valor: 452,
                Min: 382,
                Max: 714,
            }
        ],
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