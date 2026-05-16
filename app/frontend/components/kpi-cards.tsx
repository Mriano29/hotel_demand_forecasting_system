"use client";

import { TrendingUp, TrendingDown, BedDouble, Euro, CalendarX, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { kpiCards } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
    bed: BedDouble,
    euro: Euro,
    "calendar-x": CalendarX,
    star: Star,
};

export function KpiCards() {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {kpiCards.map((card) => {
                const Icon = iconMap[card.icon];
                const isUp = card.trend === "up";

                return (
                    <Card key={card.label} className="border-border/50">
                        <CardContent className="pt-5">
                            <div className="flex items-start justify-between">
                                <p className="text-sm text-muted-foreground">{card.label}</p>
                                <div className="rounded-md bg-muted p-1.5">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>

                            <p className="mt-3 text-3xl font-semibold tracking-tight">
                                {card.value}
                            </p>

                            <div className="mt-2 flex items-center gap-1.5">
                                {isUp ? (
                                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                                ) : (
                                    <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                                )}
                                <span
                                    className={cn(
                                        "text-xs font-medium",
                                        isUp ? "text-emerald-500" : "text-red-500"
                                    )}
                                >
                                    {card.delta}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    vs. período anterior
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}