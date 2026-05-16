import { ThemeSwitcher } from "@/components/theme-switcher";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Configuración</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestiona las preferencias de tu cuenta y la apariencia del panel
        </p>
      </div>

      {/* Apariencia */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Apariencia</CardTitle>
          <CardDescription>Personaliza el aspecto visual del panel</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Tema</p>
              <p className="text-xs text-muted-foreground">Cambia entre modo claro y oscuro</p>
            </div>
            <ThemeSwitcher />
          </div>
        </CardContent>
      </Card>

      {/* Cuenta */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Cuenta</CardTitle>
          <CardDescription>Información básica de tu perfil</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[
            { label: "Nombre", value: "Administrador" },
            { label: "Email", value: "admin@rmsapp.com" },
            { label: "Rol", value: "Gestor de revenue" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
              <Separator className="mt-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modelo */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Modelo predictivo</CardTitle>
          <CardDescription>Parámetros actuales del motor RMS</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[
            { label: "Versión del modelo", value: "v2.4.1" },
            { label: "Último entrenamiento", value: "31 may 2025" },
            { label: "Horizonte de predicción", value: "60 días" },
            { label: "Precisión estimada", value: "87.3%" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
              <Separator className="mt-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}