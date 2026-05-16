import { Card, CardContent } from "@/components/ui/card";
import {
    Rocket,
    ShieldCheck,
    Sparkles,
    Zap,
    LayoutDashboard,
} from "lucide-react";


export function FeaturesSection() {

    const features = [
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Rápido",
            description: "Carga instantánea y experiencia fluida.",
        },
        {
            icon: <ShieldCheck className="h-6 w-6" />,
            title: "Seguro",
            description: "Protección y autenticación confiable.",
        },
        {
            icon: <Sparkles className="h-6 w-6" />,
            title: "Moderno",
            description: "Diseño limpio y totalmente responsive.",
        },
        {
            icon: <Rocket className="h-6 w-6" />,
            title: "Escalable",
            description: "Preparado para crecer con tu proyecto.",
        },
    ];

    return (
        <section className="mx-auto max-w-7xl px-6 pb-24">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <Card
                        key={feature.title}
                        className="rounded-2xl border bg-card/50 backdrop-blur"
                    >
                        <CardContent className="flex flex-col gap-4 p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                                {feature.icon}
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
