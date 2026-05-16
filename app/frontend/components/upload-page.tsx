"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, FileText, FileSpreadsheet, FileJson, CheckCircle2, X, CloudUpload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AcceptedFile = {
    id: string;
    file: File;
    status: "pending" | "uploading" | "done" | "error";
};

const ACCEPTED = [".csv", ".xlsx", ".json"];

const formatExamples = [
    {
        type: "CSV",
        icon: FileText,
        badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        description: "Reservas y ocupación",
        headers: ["reservation_id", "check_in", "check_out", "room", "status"],
        rows: [
            ["RES-001", "2025-06-01", "2025-06-04", "101", "confirmed"],
            ["RES-002", "2025-06-02", "2025-06-05", "203", "cancelled"],
            ["RES-003", "2025-06-03", "2025-06-06", "105", "confirmed"],
        ],
    },
    {
        type: "Excel",
        icon: FileSpreadsheet,
        badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        description: "Histórico de tarifas",
        headers: ["date", "room_type", "rate", "occupancy_pct", "revenue"],
        rows: [
            ["2025-05-01", "Standard", "€89", "72%", "€6,408"],
            ["2025-05-02", "Suite", "€210", "85%", "€17,850"],
            ["2025-05-03", "Standard", "€94", "68%", "€6,392"],
        ],
    },
    {
        type: "JSON",
        icon: FileJson,
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        description: "Datos de cancelaciones",
        headers: ["id", "reservation_id", "reason", "days_before", "refund"],
        rows: [
            ["C-001", "RES-044", "no_show", "0", "false"],
            ["C-002", "RES-071", "guest_request", "14", "true"],
            ["C-003", "RES-088", "overbooking", "3", "true"],
        ],
    },
];

export function UploadPage() {
    const [files, setFiles] = useState<AcceptedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function addFiles(incoming: FileList | null) {
        if (!incoming) return;
        const valid = Array.from(incoming).filter((f) =>
            ACCEPTED.some((ext) => f.name.toLowerCase().endsWith(ext))
        );
        const newEntries: AcceptedFile[] = valid.map((f) => ({
            id: crypto.randomUUID(),
            file: f,
            status: "pending",
        }));
        setFiles((prev) => [...prev, ...newEntries]);
    }

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        addFiles(e.dataTransfer.files);
    }, []);

    function removeFile(id: string) {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    }

    function simulateUpload() {
        setFiles((prev) => prev.map((f) => ({ ...f, status: "uploading" })));
        setTimeout(() => {
            setFiles((prev) => prev.map((f) => ({ ...f, status: "done" })));
        }, 1500);
    }

    const hasPending = files.some((f) => f.status === "pending");

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Subida de datos</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Sube tus ficheros de reservas, tarifas o cancelaciones para alimentar el modelo predictivo
                </p>
            </div>

            {/* Drop zone + formats */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Drop zone — 2/3 */}
                <div className="lg:col-span-2 flex flex-col gap-3">
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={onDrop}
                        onClick={() => inputRef.current?.click()}
                        className={cn(
                            "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 cursor-pointer transition-colors",
                            isDragging
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50 hover:bg-muted/40"
                        )}
                    >
                        <div className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                            isDragging ? "bg-primary/10" : "bg-muted"
                        )}>
                            <CloudUpload className={cn("h-6 w-6", isDragging ? "text-primary" : "text-muted-foreground")} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium">
                                {isDragging ? "Suelta los ficheros aquí" : "Arrastra tus ficheros aquí"}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                o haz clic para seleccionarlos
                            </p>
                        </div>
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            accept={ACCEPTED.join(",")}
                            className="hidden"
                            onChange={(e) => addFiles(e.target.files)}
                        />
                    </div>

                    {/* File list */}
                    {files.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {files.map((entry) => (
                                <div
                                    key={entry.id}
                                    className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5"
                                >
                                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                                    <span className="flex-1 truncate text-sm">{entry.file.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {(entry.file.size / 1024).toFixed(0)} KB
                                    </span>
                                    {entry.status === "uploading" && (
                                        <span className="text-xs text-muted-foreground animate-pulse">Subiendo…</span>
                                    )}
                                    {entry.status === "done" && (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    )}
                                    {entry.status === "pending" && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeFile(entry.id); }}
                                            className="text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {hasPending && (
                                <Button onClick={simulateUpload} className="mt-1 self-end gap-2">
                                    <Upload className="h-4 w-4" />
                                    Subir ficheros
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {/* Accepted formats — 1/3 */}
                <Card className="border-border/50 h-fit">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Formatos aceptados
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        {formatExamples.map(({ type, icon: Icon, badge, description }) => (
                            <div key={type} className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <span className={cn("inline-flex items-center rounded px-2 py-0.5 text-xs font-medium", badge)}>
                                        {type}
                                    </span>
                                    <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
                                </div>
                            </div>
                        ))}

                        <div className="mt-2 rounded-md bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
                            El fichero debe incluir cabeceras en la primera fila. Tamaño máximo <span className="font-medium text-foreground">50 MB</span> por fichero.
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table previews */}
            <div className="flex flex-col gap-3">
                <h2 className="text-sm font-medium text-muted-foreground">
                    Ejemplos de estructura esperada
                </h2>
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                    {formatExamples.map(({ type, icon: Icon, badge, description, headers, rows }) => (
                        <Card key={type} className="border-border/50 overflow-hidden">
                            <CardHeader className="pb-2 flex-row items-center gap-2 space-y-0">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                                <span className={cn("inline-flex items-center rounded px-2 py-0.5 text-xs font-medium", badge)}>
                                    {type}
                                </span>
                                <span className="text-xs text-muted-foreground">{description}</span>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-t border-border/50 bg-muted/40">
                                                {headers.map((h) => (
                                                    <th
                                                        key={h}
                                                        className="px-3 py-2 text-left font-medium text-muted-foreground whitespace-nowrap"
                                                    >
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, ri) => (
                                                <tr
                                                    key={ri}
                                                    className="border-t border-border/50 hover:bg-muted/20 transition-colors"
                                                >
                                                    {row.map((cell, ci) => (
                                                        <td key={ci} className="px-3 py-2 text-muted-foreground whitespace-nowrap font-mono">
                                                            {cell}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}