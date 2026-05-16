export const kpiCards = [
  {
    label: "Ocupación",
    value: "78%",
    delta: "+4.2%",
    trend: "up" as const,
    icon: "bed",
  },
  {
    label: "RevPAR",
    value: "€94",
    delta: "+7.8%",
    trend: "up" as const,
    icon: "euro",
  },
  {
    label: "Cancelaciones",
    value: "12%",
    delta: "+2.1%",
    trend: "down" as const,
    icon: "calendar-x",
  },
  {
    label: "Valoración",
    value: "8.4",
    delta: "+0.3",
    trend: "up" as const,
    icon: "star",
  },
];

export const occupancyData = {
  labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  weeks: [
    [72, 74, 69, 75, 82, 88, 80],
    [70, 73, 78, 80, 85, 90, 83],
    [68, 72, 76, 81, 87, 91, 85],
    [71, 75, 79, 82, 86, 89, 82],
  ],
};

export const cancellationsData = {
  labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  values: [3, 2, 5, 4, 7, 6, 2],
};

export type HeatmapRow = {
  room: string;
  values: number[]; // 0–1 risk per day
};

export const heatmapData: HeatmapRow[] = [
  { room: "101", values: [0.1, 0.2, 0.6, 0.8, 0.9, 0.7, 0.3] },
  { room: "102", values: [0.3, 0.1, 0.4, 0.5, 0.8, 0.9, 0.2] },
  { room: "103", values: [0.5, 0.4, 0.2, 0.3, 0.7, 0.8, 0.5] },
  { room: "104", values: [0.2, 0.6, 0.7, 0.4, 0.6, 0.5, 0.1] },
  { room: "105", values: [0.7, 0.8, 0.5, 0.6, 0.9, 0.8, 0.4] },
  { room: "201", values: [0.1, 0.3, 0.4, 0.2, 0.5, 0.7, 0.6] },
  { room: "202", values: [0.4, 0.2, 0.8, 0.7, 0.6, 0.9, 0.3] },
  { room: "203", values: [0.6, 0.5, 0.3, 0.8, 0.7, 0.4, 0.2] },
  { room: "204", values: [0.3, 0.7, 0.6, 0.5, 0.8, 0.6, 0.4] },
  { room: "205", values: [0.8, 0.4, 0.2, 0.9, 0.7, 0.5, 0.3] },
];

export const days = ["L", "M", "X", "J", "V", "S", "D"];

export type RiskLevel = "alto" | "medio" | "bajo";

export type OccupancyRiskRow = {
  id: string;
  fecha: string;
  probabilidad: number; // 0–100
  riesgo: RiskLevel;
};

export const occupancyRiskData: OccupancyRiskRow[] = [
  { id: "R-001", fecha: "2025-06-02", probabilidad: 91, riesgo: "alto" },
  { id: "R-002", fecha: "2025-06-03", probabilidad: 83, riesgo: "alto" },
  { id: "R-003", fecha: "2025-06-04", probabilidad: 76, riesgo: "alto" },
  { id: "R-004", fecha: "2025-06-05", probabilidad: 63, riesgo: "medio" },
  { id: "R-005", fecha: "2025-06-06", probabilidad: 58, riesgo: "medio" },
  { id: "R-006", fecha: "2025-06-07", probabilidad: 51, riesgo: "medio" },
  { id: "R-007", fecha: "2025-06-08", probabilidad: 44, riesgo: "medio" },
  { id: "R-008", fecha: "2025-06-09", probabilidad: 37, riesgo: "medio" },
  { id: "R-009", fecha: "2025-06-10", probabilidad: 28, riesgo: "bajo" },
  { id: "R-010", fecha: "2025-06-11", probabilidad: 22, riesgo: "bajo" },
  { id: "R-011", fecha: "2025-06-12", probabilidad: 88, riesgo: "alto" },
  { id: "R-012", fecha: "2025-06-13", probabilidad: 15, riesgo: "bajo" },
  { id: "R-013", fecha: "2025-06-14", probabilidad: 71, riesgo: "alto" },
  { id: "R-014", fecha: "2025-06-15", probabilidad: 49, riesgo: "medio" },
  { id: "R-015", fecha: "2025-06-16", probabilidad: 9,  riesgo: "bajo" },
];