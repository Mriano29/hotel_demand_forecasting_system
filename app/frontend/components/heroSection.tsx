"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-28 text-center">
      <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
        Construye experiencias modernas con facilidad
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Una plantilla elegante creada con Next.js, Tailwind y shadcn/ui para
        empezar tus proyectos rápidamente.
      </p>

      <Button
        size="lg"
        className="mt-8"
        onClick={() => router.push("/dashboard")}
      >
        Empezar ahora
      </Button>
    </section>
  );
}