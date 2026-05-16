import { KpiCards } from "@/components/kpi-cards";
import { OccupancyChart } from "@/components/occupancy-chart";
import { CancellationsChart } from "@/components/cancellations-chart";
import { CancellationHeatmap } from "@/components/cancellation-heatmap";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Vista general</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Resumen de ocupación, cancelaciones y riesgo operativo del establecimiento
        </p>
      </div>

      {/* KPI cards */}
      <KpiCards />

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <OccupancyChart />
        <CancellationsChart />
      </div>

      {/* Heatmap */}
      <CancellationHeatmap />
    </div>
  );
}