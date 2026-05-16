"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  LayoutDashboard,
  UtensilsCrossed,
  Activity,
  Upload,
  History,
  Settings,
  CalendarCheck,
  AlertTriangle,
} from "lucide-react";

import { cn } from "@/lib/utils";

const menu = [
  { label: "Dashboard", icon: UtensilsCrossed, href: "/dashboard" },
  { label: "Predicción de ocupación", icon: Activity, href: "/dashboard/occupancy-prediction" },
  { label: "Riesgo de cancelaciones", icon: LayoutDashboard, href: "/dashboard/cancellation-risk" },
  { label: "Subida de datos", icon: LayoutDashboard, href: "/dashboard/data-upload" },
  { label: "Historial de subidas", icon: CalendarCheck, href: "/dashboard/upload-history" },
];

const bottomMenu = [
  { label: "Configuración", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-72 border-r bg-background flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary" />
          <span className="text-lg font-semibold">RMS App</span>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Button
                key={item.label}
                asChild
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  active && "font-medium"
                )}
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Bottom section */}
      <div className="p-3">
        {bottomMenu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Button
              key={item.label}
              asChild
              variant={active ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
            >
              <Link href={item.href}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}