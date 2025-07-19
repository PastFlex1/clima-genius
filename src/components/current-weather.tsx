import type { CurrentWeather } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Thermometer,
  Droplets,
  Gauge,
  Wind,
  Compass,
  Sunrise,
  Sunset,
  Eye,
  Sun,
  Droplet,
} from "lucide-react";
import WeatherIcon from "./weather-icon";

type CurrentWeatherProps = {
  city: string;
  data: CurrentWeather;
};

const DataPoint = ({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit?: string;
}) => (
  <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg space-y-1 text-center h-full">
    <Icon className="w-6 h-6 text-primary" />
    <span className="font-semibold text-sm">{label}</span>
    <span className="text-lg font-bold">
      {value}
      {unit}
    </span>
  </div>
);

const CurrentWeather = ({ city, data }: CurrentWeatherProps) => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          Clima actual en {city}
        </CardTitle>
        <CardDescription>
          Datos detallados actualizados de fuentes fiables.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <WeatherIcon
              description={data.description}
              className="w-24 h-24 text-accent drop-shadow-lg"
            />
            <div className="text-center">
              <p className="text-7xl font-bold text-primary-foreground/90">
                {data.temperature}°
              </p>
              <p className="text-muted-foreground text-lg capitalize">
                {data.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <DataPoint
              icon={Thermometer}
              label="Sensación"
              value={data.feelsLike}
              unit="°"
            />
            <DataPoint icon={Droplets} label="Humedad" value={data.humidity} unit="%" />
            <DataPoint
              icon={Wind}
              label="Viento"
              value={data.windSpeed}
              unit=" km/h"
            />
            <DataPoint
              icon={Compass}
              label="Dirección"
              value={data.windDirection}
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
          <DataPoint icon={Gauge} label="Presión" value={data.pressure} unit=" hPa" />
          <DataPoint icon={Droplet} label="Pto. Rocío" value={data.dewPoint} unit="°" />
          <DataPoint icon={Eye} label="Visibilidad" value={data.visibility} unit=" km" />
          <DataPoint icon={Sun} label="Índice UV" value={data.uvIndex} />
          <div className="col-span-2 md:col-span-1 lg:col-span-1 grid grid-cols-2 gap-2">
             <DataPoint icon={Sunrise} label="Amanecer" value={data.sunrise} />
             <DataPoint icon={Sunset} label="Atardecer" value={data.sunset} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
