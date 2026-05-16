"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { occupancyRiskData, type RiskLevel } from "@/lib/mock-data";

const riskConfig: Record<
    RiskLevel,
    { label: string; bar: string; badge: string; text: string }
> = {
    alto: {
        label: "Alto",
        bar: "bg-red-500",
        badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
        text: "text-red-600 dark:text-red-400",
    },
    medio: {
        label: "Medio",
        bar: "bg-amber-400",
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        text: "text-amber-600 dark:text-amber-400",
    },
    bajo: {
        label: "Bajo",
        bar: "bg-emerald-500",
        badge:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        text: "text-emerald-600 dark:text-emerald-400",
    },
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function CancelationRiskTable() {
    const [filter, setFilter] = useState<RiskLevel | "todos">("todos");

    const filtered =
        filter === "todos"
            ? occupancyRiskData
            : occupancyRiskData.filter((r) => r.riesgo === filter);

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Riesgo de cancelación
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Predicción de riesgo por fecha según el modelo RMS
                    </p>
                </div>

                <Select
                    value={filter}
                    onValueChange={(v) => setFilter(v as RiskLevel | "todos")}
                >
                    <SelectTrigger className="w-[160px] shrink-0">
                        <SelectValue placeholder="Filtrar riesgo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="alto">Alto</SelectItem>
                        <SelectItem value="medio">Medio</SelectItem>
                        <SelectItem value="bajo">Bajo</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/40 hover:bg-muted/40">
                            <TableHead className="w-[100px] font-medium">ID</TableHead>
                            <TableHead className="font-medium">Fecha</TableHead>
                            <TableHead className="font-medium">Probabilidad</TableHead>
                            <TableHead className="font-medium">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="py-10 text-center text-sm text-muted-foreground"
                                >
                                    No hay registros para este nivel de riesgo.
                                </TableCell>
                            </TableRow>
                        )}
                        {filtered.map((row) => {
                            const cfg = riskConfig[row.riesgo];
                            return (
                                <TableRow key={row.id} className="group">
                                    {/* ID */}
                                    <TableCell className="font-mono text-sm font-medium text-muted-foreground">
                                        {row.id}
                                    </TableCell>

                                    {/* Fecha */}
                                    <TableCell className="text-sm">
                                        {formatDate(row.fecha)}
                                    </TableCell>

                                    {/* Probabilidad — progress bar */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-2 w-36 overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className={cn(
                                                        "absolute inset-y-0 left-0 rounded-full transition-all",
                                                        cfg.bar
                                                    )}
                                                    style={{ width: `${row.probabilidad}%` }}
                                                />
                                            </div>
                                            <span
                                                className={cn("text-sm font-medium tabular-nums", cfg.text)}
                                            >
                                                {row.probabilidad}%
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Estado — badge */}
                                    <TableCell>
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium",
                                                cfg.badge
                                            )}
                                        >
                                            {cfg.label}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}