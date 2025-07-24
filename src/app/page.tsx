import WeatherDashboard from "@/components/weather-dashboard";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-gradient-to-br from-background via-secondary/50 to-background" />
       <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground/90 tracking-tight font-headline">
            ClimaGenius
          </h1>
          <p className="text-muted-foreground mt-2">
            Tu asistente inteligente de clima y estilo.
          </p>
        </header>
        <WeatherDashboard />
      </div>
    </main>
  );
}
