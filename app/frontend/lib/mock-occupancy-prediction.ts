export type OccupancyWeek = {
    weekLabel: string;
    startDate: string;
    days: {
        label: string;
        date: string;
        value: number; // 0–1
    }[];
};

export const occupancyPrediction: OccupancyWeek[] = [
    {
        weekLabel: "Semana 1",
        startDate: "2025-06-02",
        days: [
            { label: "Lun", date: "2025-06-02", value: 0.72 },
            { label: "Mar", date: "2025-06-03", value: 0.68 },
            { label: "Mié", date: "2025-06-04", value: 0.75 },
            { label: "Jue", date: "2025-06-05", value: 0.81 },
            { label: "Vie", date: "2025-06-06", value: 0.91 },
            { label: "Sáb", date: "2025-06-07", value: 0.95 },
            { label: "Dom", date: "2025-06-08", value: 0.88 },
        ],
    },
    {
        weekLabel: "Semana 2",
        startDate: "2025-06-09",
        days: [
            { label: "Lun", date: "2025-06-09", value: 0.61 },
            { label: "Mar", date: "2025-06-10", value: 0.57 },
            { label: "Mié", date: "2025-06-11", value: 0.63 },
            { label: "Jue", date: "2025-06-12", value: 0.70 },
            { label: "Vie", date: "2025-06-13", value: 0.84 },
            { label: "Sáb", date: "2025-06-14", value: 0.89 },
            { label: "Dom", date: "2025-06-15", value: 0.79 },
        ],
    },
    {
        weekLabel: "Semana 3",
        startDate: "2025-06-16",
        days: [
            { label: "Lun", date: "2025-06-16", value: 0.45 },
            { label: "Mar", date: "2025-06-17", value: 0.42 },
            { label: "Mié", date: "2025-06-18", value: 0.50 },
            { label: "Jue", date: "2025-06-19", value: 0.55 },
            { label: "Vie", date: "2025-06-20", value: 0.78 },
            { label: "Sáb", date: "2025-06-21", value: 0.92 },
            { label: "Dom", date: "2025-06-22", value: 0.83 },
        ],
    },
    {
        weekLabel: "Semana 4",
        startDate: "2025-06-23",
        days: [
            { label: "Lun", date: "2025-06-23", value: 0.33 },
            { label: "Mar", date: "2025-06-24", value: 0.29 },
            { label: "Mié", date: "2025-06-25", value: 0.38 },
            { label: "Jue", date: "2025-06-26", value: 0.44 },
            { label: "Vie", date: "2025-06-27", value: 0.67 },
            { label: "Sáb", date: "2025-06-28", value: 0.85 },
            { label: "Dom", date: "2025-06-29", value: 0.74 },
        ],
    },
    {
        weekLabel: "Semana 5",
        startDate: "2025-06-30",
        days: [
            { label: "Lun", date: "2025-06-30", value: 0.55 },
            { label: "Mar", date: "2025-07-01", value: 0.60 },
            { label: "Mié", date: "2025-07-02", value: 0.65 },
            { label: "Jue", date: "2025-07-03", value: 0.71 },
            { label: "Vie", date: "2025-07-04", value: 0.88 },
            { label: "Sáb", date: "2025-07-05", value: 0.97 },
            { label: "Dom", date: "2025-07-06", value: 0.91 },
        ],
    },
    {
        weekLabel: "Semana 6",
        startDate: "2025-07-07",
        days: [
            { label: "Lun", date: "2025-07-07", value: 0.48 },
            { label: "Mar", date: "2025-07-08", value: 0.52 },
            { label: "Mié", date: "2025-07-09", value: 0.58 },
            { label: "Jue", date: "2025-07-10", value: 0.63 },
            { label: "Vie", date: "2025-07-11", value: 0.80 },
            { label: "Sáb", date: "2025-07-12", value: 0.93 },
            { label: "Dom", date: "2025-07-13", value: 0.86 },
        ],
    },
    {
        weekLabel: "Semana 7",
        startDate: "2025-07-14",
        days: [
            { label: "Lun", date: "2025-07-14", value: 0.22 },
            { label: "Mar", date: "2025-07-15", value: 0.19 },
            { label: "Mié", date: "2025-07-16", value: 0.25 },
            { label: "Jue", date: "2025-07-17", value: 0.31 },
            { label: "Vie", date: "2025-07-18", value: 0.54 },
            { label: "Sáb", date: "2025-07-19", value: 0.72 },
            { label: "Dom", date: "2025-07-20", value: 0.63 },
        ],
    },
    {
        weekLabel: "Semana 8",
        startDate: "2025-07-21",
        days: [
            { label: "Lun", date: "2025-07-21", value: 0.66 },
            { label: "Mar", date: "2025-07-22", value: 0.70 },
            { label: "Mié", date: "2025-07-23", value: 0.74 },
            { label: "Jue", date: "2025-07-24", value: 0.79 },
            { label: "Vie", date: "2025-07-25", value: 0.90 },
            { label: "Sáb", date: "2025-07-26", value: 0.98 },
            { label: "Dom", date: "2025-07-27", value: 0.93 },
        ],
    },
];