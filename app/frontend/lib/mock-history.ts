export type FileType = "CSV" | "Excel" | "JSON";

export type DatasetRecord = {
  id: string;
  nombre: string;
  tipo: FileType;
  fechaSubida: string;
};

export const datasetHistory: DatasetRecord[] = [
  { id: "d-001", nombre: "reservas_mayo_2025.csv",       tipo: "CSV",   fechaSubida: "2025-05-31" },
  { id: "d-002", nombre: "ocupacion_q1_2025.xlsx",        tipo: "Excel", fechaSubida: "2025-04-15" },
  { id: "d-003", nombre: "cancelaciones_abril.json",      tipo: "JSON",  fechaSubida: "2025-04-02" },
  { id: "d-004", nombre: "reservas_marzo_2025.csv",       tipo: "CSV",   fechaSubida: "2025-03-30" },
  { id: "d-005", nombre: "historico_2024_completo.xlsx",  tipo: "Excel", fechaSubida: "2025-01-10" },
  { id: "d-006", nombre: "tarifas_temporada_alta.json",   tipo: "JSON",  fechaSubida: "2025-02-18" },
  { id: "d-007", nombre: "reservas_febrero_2025.csv",     tipo: "CSV",   fechaSubida: "2025-02-28" },
  { id: "d-008", nombre: "ocupacion_q4_2024.xlsx",        tipo: "Excel", fechaSubida: "2025-01-05" },
];