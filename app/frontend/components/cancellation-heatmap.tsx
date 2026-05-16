"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { heatmapData, days } from "@/lib/mock-data";
import React from "react";

function getRiskLevel(value: number): {
    label: string;
    cellClass: string;
    textClass: string;
} {
    if (value < 0.2)
        return { label: "Muy bajo", cellClass: "bg-emerald-100 dark:bg-emerald-950", textClass: "text-emerald-700 dark:text-emerald-300" };
    if (value < 0.4)
        return { label: "Bajo", cellClass: "bg-emerald-200 dark:bg-emerald-900", textClass: "text-emerald-800 dark:text-emerald-200" };
    if (value < 0.6)
        return { label: "Medio", cellClass: "bg-amber-200 dark:bg-amber-900", textClass: "text-amber-800 dark:text-amber-200" };
    if (value < 0.8)
        return { label: "Alto", cellClass: "bg-orange-300 dark:bg-orange-900", textClass: "text-orange-900 dark:text-orange-200" };
    return { label: "Muy alto", cellClass: "bg-red-300 dark:bg-red-900", textClass: "text-red-900 dark:text-red-200" };
}

const legendStops = [0.1, 0.3, 0.5, 0.7, 0.9];

export function CancellationHeatmap() {
    return (
        <Card className="border-border/50">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Riesgo de cancelación semanal por habitación
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Bajo</span>
                        <div className="flex gap-0.5">
                            {legendStops.map((v) => {
                                const { cellClass } = getRiskLevel(v);
                                return (
                                    <div
                                        key={v}
                                        className={cn("h-3 w-5 rounded-sm", cellClass)}
                                    />
                                );
                            })}
                        </div>
                        <span>Alto</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <TooltipProvider delayDuration={100}>
                    <div className="overflow-x-auto">
                        <div
                            className="grid min-w-[420px]"
                            style={{
                                gridTemplateColumns: `56px repeat(${days.length}, 1fr)`,
                                gap: "4px",
                            }}
                        >
                            {/* Header row */}
                            <div />
                            {days.map((d) => (
                                <div
                                    key={d}
                                    className="pb-1 text-center text-xs font-medium text-muted-foreground"
                                >
                                    {d}
                                </div>
                            ))}

                            {/* Data rows */}
                            {heatmapData.map((row) => (
                                <React.Fragment key={row.room}>
                                    <div
                                        className="flex items-center text-xs text-muted-foreground"
                                    >
                                        {row.room}
                                    </div>

                                    {row.values.map((value, di) => {
                                        const { label, cellClass, textClass } = getRiskLevel(value);
                                        const pct = Math.round(value * 100);

                                        return (
                                            <Tooltip key={`${row.room}-${di}`}>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className={cn(
                                                            "flex h-9 cursor-default items-center justify-center rounded text-xs font-medium transition-opacity hover:opacity-75",
                                                            cellClass,
                                                            textClass
                                                        )}
                                                    >
                                                        {pct}%
                                                    </div>
                                                </TooltipTrigger>

                                                <TooltipContent side="top" className="text-xs">
                                                    <p>
                                                        Hab. {row.room} · {days[di]}
                                                    </p>

                                                    <p className="font-medium">
                                                        {label} ({pct}%)
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}