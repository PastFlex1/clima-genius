import WeatherDashboard from "@/components/weather-dashboard";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-50 blur-[100px]"></div>
      </div>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground/90 tracking-tight font-headline">
            ClimaGenius
          </h1>
          <p className="text-muted-foreground mt-2">
            Your intelligent weather and style companion.
          </p>
        </header>
        <WeatherDashboard />
      </div>
    </main>
  );
}
