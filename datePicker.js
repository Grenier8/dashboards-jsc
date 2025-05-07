function createCalendarChart(containerId, inputId) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dateRange = [new Date('1/1/2010'), new Date('12/31/2030')];
    let curDate = new Date();

    const chart = JSC.chart(containerId, {
        debug: false,
        type: 'calendar month solid',
        yAxis_visible: false,
        legend_visible: false,
        defaultTooltip: { enabled: false },
        xAxis_defaultTick_label_color: '#BDBDBD',
        calendar: {
            range: dateRange,
            initial: curDate,
            defaultEdgePoint: {
                label_color: '#E0E0E0',
                color: 'white'
            }
        },
        defaultSeries: {
            shape_innerPadding: 0.2,
            pointSelection: 'single',
            defaultPoint: {
                outline_width: 0,
                label_text: '%name',
                focusGlow: false
            }
        },
        events_pointSelectionChanged: function (points) {
            const selectedDate = points[0].options('attributes_date');
            document.getElementById(inputId).value = JSC.formatDate(selectedDate, 'dd-MM-yyyy');
            document.getElementById(containerId).style.display = "none";
        },
        toolbar_items: {
            backward: {
                position: 'top left',
                fill: 'none',
                outline_visible: false,
                margin: 5,
                icon: { name: 'linear/arrows/left', fill: '#757575' },
                events_click: () => {
                    const d = new Date(curDate);
                    zoomTo(new Date(d.setMonth(d.getMonth() - 1)));
                }
            },
            forward: {
                position: 'top right',
                fill: 'none',
                outline_visible: false,
                margin: 5,
                icon: { name: 'linear/arrows/right', fill: '#757575' },
                events_click: () => {
                    const d = new Date(curDate);
                    zoomTo(new Date(d.setMonth(d.getMonth() + 1)));
                }
            },
            month: {
                type: 'select',
                position: 'top',
                margin_bottom: 8,
                boxVisible: false,
                icon_visible: false,
                items: months.join(','),
                value: JSC.formatDate(curDate, 'MMMM'),
                events_change: val => {
                    const d = new Date(curDate);
                    zoomTo(new Date(d.setMonth(months.indexOf(val))));
                }
            },
            year: {
                type: 'select',
                position: 'top',
                margin_bottom: 8,
                boxVisible: false,
                icon_visible: false,
                items: makeYearsList(dateRange).join(','),
                value: JSC.formatDate(curDate, 'yyyy'),
                events_change: val => {
                    const d = new Date(curDate);
                    zoomTo(new Date(d.setFullYear(val)));
                }
            }
        }
    }, function (c) {
        c.series().points(curDate.getTime()).options({ selected: true });
    });

    function zoomTo(d) {
        if (d >= dateRange[0] && d <= dateRange[1]) {
            chart.uiItems('month').options({ value: JSC.formatDate(d, 'MMMM') });
            chart.uiItems('year').options({ value: JSC.formatDate(d, 'yyyy') });
            chart.zoom(d);
            curDate = d;
        }
    }

    function makeYearsList(range) {
        const years = [];
        for (let i = new Date(range[0]).getFullYear(); i <= new Date(range[1]).getFullYear(); i++) {
            years.push(i);
        }
        return years;
    }

    return chart;
}

const datePicker1 = createCalendarChart("startPopup", "startInput")
const datePicker2 = createCalendarChart("endPopup", "endInput")
