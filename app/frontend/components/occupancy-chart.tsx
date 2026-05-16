"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { occupancyData } from "@/lib/mock-data";

const flatData = occupancyData.labels.map((day, i) => ({
    day,
    "Sem. 1": occupancyData.weeks[0][i],
    "Sem. 2": occupancyData.weeks[1][i],
    "Sem. 3": occupancyData.weeks[2][i],
    "Sem. 4": occupancyData.weeks[3][i],
}));

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

export function OccupancyChart() {
    return (
        <Card className="border-border/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Ocupación prevista — próximas 4 semanas
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-3 flex flex-wrap gap-3">
                    {["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"].map((label, i) => (
                        <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span
                                className="inline-block h-2.5 w-2.5 rounded-sm"
                                style={{ background: COLORS[i] }}
                            />
                            {label}
                        </span>
                    ))}
                </div>

                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={flatData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 12 }}
                            className="fill-muted-foreground"
                        />
                        <YAxis
                            domain={[50, 100]}
                            tickFormatter={(v) => `${v}%`}
                            tick={{ fontSize: 12 }}
                            className="fill-muted-foreground"
                        />
                        <Tooltip
                            formatter={(value) => [`${value}%`, ""]}
                            contentStyle={{
                                fontSize: 12,
                                borderRadius: 8,
                                border: "0.5px solid hsl(var(--border))",
                            }}
                        />
                        {["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"].map((key, i) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={COLORS[i]}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}