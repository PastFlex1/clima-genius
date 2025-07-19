import type { CurrentWeather } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Thermometer, Droplets, Gauge, Wind } from "lucide-react";
import WeatherIcon from "./weather-icon";

type CurrentWeatherProps = {
  city: string;
  data: CurrentWeather;
};

const CurrentWeather = ({ city, data }: CurrentWeatherProps) => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Clima actual en {city}</CardTitle>
        <CardDescription>Datos actualizados de fuentes fiables.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <WeatherIcon
            description={data.description}
            className="w-24 h-24 text-accent drop-shadow-lg"
          />
          <div className="text-center">
            <p className="text-7xl font-bold text-primary-foreground/90">
              {data.temperature}°
            </p>
            <p className="text-muted-foreground text-lg capitalize">{data.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg space-y-1 text-center">
            <Droplets className="w-6 h-6 text-primary" />
            <span className="font-semibold">Humedad</span>
            <span className="text-lg font-bold">{data.humidity}%</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg space-y-1 text-center">
            <Wind className="w-6 h-6 text-primary" />
            <span className="font-semibold">Viento</span>
            <span className="text-lg font-bold">{data.windSpeed} km/h</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg space-y-1 text-center">
            <Gauge className="w-6 h-6 text-primary" />
            <span className="font-semibold">Presión</span>
            <span className="text-lg font-bold">{data.pressure} hPa</span>
          </div>
           <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg space-y-1 text-center">
            <Thermometer className="w-6 h-6 text-primary" />
            <span className="font-semibold">Sensación</span>
            <span className="text-lg font-bold">{data.feelsLike}°</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
