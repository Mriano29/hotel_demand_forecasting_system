import { Suspense } from "react";
import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <Suspense fallback={<div className="animate-pulse h-full w-full rounded-md bg-muted" />}>
          <AuthGuard>{children}</AuthGuard>
        </Suspense>
      </main>
    </div>
  );
}