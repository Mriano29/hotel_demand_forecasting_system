"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { occupancyPrediction } from "@/lib/mock-occupancy-prediction";

type DateRange = { from: string; to: string };

function getCellStyle(value: number): { cell: string; text: string; label: string } {
    if (value >= 0.85) return { cell: "bg-blue-600 dark:bg-blue-500", text: "text-white", label: "Muy alta" };
    if (value >= 0.7) return { cell: "bg-blue-400 dark:bg-blue-600", text: "text-white", label: "Alta" };
    if (value >= 0.55) return { cell: "bg-blue-200 dark:bg-blue-800", text: "text-blue-900 dark:text-blue-100", label: "Media" };
    if (value >= 0.35) return { cell: "bg-blue-100 dark:bg-blue-900", text: "text-blue-700 dark:text-blue-200", label: "Baja" };
    return { cell: "bg-muted", text: "text-muted-foreground", label: "Muy baja" };
}

function formatDateShort(iso: string) {
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}

function formatDateLong(iso: string) {
    return new Date(iso).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
}

const legendStops = [0.1, 0.3, 0.55, 0.72, 0.9];

export function OccupancyPredictionHeatmap() {
    const [dateRange, setDateRange] = useState<DateRange>({ from: "", to: "" });
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    const hasFilter = dateRange.from || dateRange.to;

    const filteredWeeks = useMemo(() => {
        if (!dateRange.from && !dateRange.to) return occupancyPrediction;
        return occupancyPrediction
            .map((week) => ({
                ...week,
                days: week.days.filter((day) => {
                    if (dateRange.from && dateRange.to) return day.date >= dateRange.from && day.date <= dateRange.to;
                    if (dateRange.from) return day.date >= dateRange.from;
                    if (dateRange.to) return day.date <= dateRange.to;
                    return true;
                }),
            }))
            .filter((week) => week.days.length > 0);
    }, [dateRange]);

    const hoveredDay = useMemo(() => {
        if (!hoveredDate) return null;
        for (const week of occupancyPrediction) {
            const found = week.days.find((d) => d.date === hoveredDate);
            if (found) return found;
        }
        return null;
    }, [hoveredDate]);

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Predicción de ocupación</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Probabilidad de ocupación diaria según el modelo predictivo RMS
                    </p>
                </div>

                {/* Date range filter */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-muted-foreground whitespace-nowrap">Desde</label>
                        <input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) => setDateRange((r) => ({ ...r, from: e.target.value }))}
                            className="h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs text-muted-foreground whitespace-nowrap">Hasta</label>
                        <input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) => setDateRange((r) => ({ ...r, to: e.target.value }))}
                            className="h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                    </div>
                    {hasFilter && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => setDateRange({ from: "", to: "" })}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Heatmap card */}
            <Card className="border-border/50">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            {filteredWeeks.length > 0
                                ? `${filteredWeeks.length} semana${filteredWeeks.length !== 1 ? "s" : ""} · ${filteredWeeks.reduce((acc, w) => acc + w.days.length, 0)} días`
                                : "Sin resultados para el rango seleccionado"}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Baja</span>
                            <div className="flex gap-1">
                                {legendStops.map((v) => (
                                    <div key={v} className={cn("h-3 w-6 rounded-sm", getCellStyle(v).cell)} />
                                ))}
                            </div>
                            <span>Alta</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {filteredWeeks.length === 0 ? (
                        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                            No hay datos para el rango de fechas seleccionado.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filteredWeeks.map((week) => (
                                <div key={week.weekLabel} className="flex flex-col gap-1.5">
                                    <p className="text-xs font-medium text-muted-foreground">
                                        {week.weekLabel}
                                        <span className="ml-2 font-normal opacity-60">
                                            {formatDateShort(week.days[0].date)}
                                            {week.days.length > 1 && ` – ${formatDateShort(week.days[week.days.length - 1].date)}`}
                                        </span>
                                    </p>
                                    <div
                                        className="grid gap-2"
                                        style={{ gridTemplateColumns: `repeat(${week.days.length}, 1fr)` }}
                                    >
                                        {week.days.map((day) => {
                                            const { cell, text } = getCellStyle(day.value);
                                            const isHovered = hoveredDate === day.date;
                                            return (
                                                <div
                                                    key={day.date}
                                                    onMouseEnter={() => setHoveredDate(day.date)}
                                                    onMouseLeave={() => setHoveredDate(null)}
                                                    className={cn(
                                                        "flex flex-col items-center justify-center rounded-lg py-5 gap-1 cursor-default transition-all duration-150",
                                                        cell,
                                                        text,
                                                        isHovered && "ring-2 ring-offset-1 ring-foreground/20 scale-[1.03]"
                                                    )}
                                                >
                                                    <span className="text-xs font-medium opacity-80">{day.label}</span>
                                                    <span className="text-lg font-semibold leading-none">
                                                        {Math.round(day.value * 100)}%
                                                    </span>
                                                    <span className="text-[10px] opacity-60">{formatDateShort(day.date)}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Hover detail bar */}
            <div
                className={cn(
                    "rounded-lg border border-border/50 bg-muted/40 px-4 py-3 text-sm transition-opacity duration-200",
                    hoveredDay ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            >
                {hoveredDay && (
                    <div className="flex items-center gap-4">
                        <span className="font-medium capitalize">{formatDateLong(hoveredDay.date)}</span>
                        <span className="text-muted-foreground">·</span>
                        <span>
                            Ocupación prevista:{" "}
                            <span className="font-semibold">{Math.round(hoveredDay.value * 100)}%</span>
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">{getCellStyle(hoveredDay.value).label}</span>
                    </div>
                )}
            </div>
        </div>
    );
}