"use client";

import { useState } from "react";
import { Trash2, FileText, FileSpreadsheet, FileJson } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { datasetHistory, type FileType, type DatasetRecord } from "@/lib/mock-history";

const fileConfig: Record<FileType, { icon: React.ElementType; badge: string }> = {
    CSV: {
        icon: FileText,
        badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    },
    Excel: {
        icon: FileSpreadsheet,
        badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    },
    JSON: {
        icon: FileJson,
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function DeleteConfirm({
    record,
    onConfirm,
}: {
    record: DatasetRecord;
    onConfirm: () => void;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar dataset?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Se eliminará <span className="font-medium text-foreground">{record.nombre}</span> de forma permanente. Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function DatasetHistoryTable() {
    const [records, setRecords] = useState<DatasetRecord[]>(datasetHistory);

    function handleDelete(id: string) {
        setRecords((prev) => prev.filter((r) => r.id !== id));
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Historial de datasets
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Ficheros subidos al sistema para el entrenamiento y predicción del modelo
                </p>
            </div>

            <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/40 hover:bg-muted/40">
                            <TableHead className="font-medium">Nombre</TableHead>
                            <TableHead className="w-[100px] font-medium">Tipo</TableHead>
                            <TableHead className="w-[160px] font-medium">Fecha de subida</TableHead>
                            <TableHead className="w-[60px]" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="py-10 text-center text-sm text-muted-foreground"
                                >
                                    No hay datasets subidos todavía.
                                </TableCell>
                            </TableRow>
                        )}
                        {records.map((record) => {
                            const cfg = fileConfig[record.tipo];
                            const Icon = cfg.icon;
                            return (
                                <TableRow key={record.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2.5">
                                            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                                            <span className="text-sm font-medium">{record.nombre}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium",
                                                cfg.badge
                                            )}
                                        >
                                            {record.tipo}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {formatDate(record.fechaSubida)}
                                    </TableCell>
                                    <TableCell>
                                        <DeleteConfirm
                                            record={record}
                                            onConfirm={() => handleDelete(record.id)}
                                        />
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