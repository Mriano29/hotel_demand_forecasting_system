"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cancellationsData } from "@/lib/mock-data";

const data = cancellationsData.labels.map((day, i) => ({
    day,
    cancelaciones: cancellationsData.values[i],
}));

const max = Math.max(...cancellationsData.values);

export function CancellationsChart() {
    return (
        <Card className="border-border/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cancelaciones previstas por día
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={245}>
                    <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 12 }}
                            className="fill-muted-foreground"
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            className="fill-muted-foreground"
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: "hsl(var(--muted))" }}
                            contentStyle={{
                                fontSize: 12,
                                borderRadius: 8,
                                border: "0.5px solid hsl(var(--border))",
                            }}
                        />
                        <Bar dataKey="cancelaciones" radius={[4, 4, 0, 0]}>
                            {data.map((entry) => (
                                <Cell
                                    key={entry.day}
                                    fill={
                                        entry.cancelaciones === max
                                            ? "#ef4444"
                                            : entry.cancelaciones >= max * 0.7
                                                ? "#f97316"
                                                : "#3b82f6"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}