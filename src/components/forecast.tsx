import type { HourlyForecast, DailyForecast } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WeatherIcon from "./weather-icon";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Droplet, Wind } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

type ForecastProps = {
  hourly: HourlyForecast[];
  daily: DailyForecast[];
};

const Forecast = ({ hourly, daily }: ForecastProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline">Pronóstico Detallado</CardTitle>
        <CardDescription>
          Planifica tu semana con la previsión por hora y diaria.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2 text-primary-foreground/90">
            Próximas 8 horas
          </h3>
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {hourly.map((forecast, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center min-w-[90px] p-2 bg-secondary/50 rounded-lg space-y-1"
                >
                  <p className="text-sm text-muted-foreground">
                    {forecast.time}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <WeatherIcon
                          description={forecast.description}
                          className="w-8 h-8 my-1 text-accent"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="capitalize">{forecast.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <p className="font-bold text-lg">{forecast.temperature}°</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <div className="flex items-center gap-1">
                        <Droplet className="w-3 h-3"/>
                        <span>{forecast.precipitationChance}%</span>
                    </div>
                     <div className="flex items-center gap-1">
                        <Wind className="w-3 h-3"/>
                        <span>{forecast.windSpeed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2 text-primary-foreground/90">
            Próximos 7 días
          </h3>
          <ul className="space-y-1">
            {daily.map((forecast, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50"
              >
                <span className="font-medium w-[70px]">{forecast.day}</span>
                 <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2">
                        <WeatherIcon
                          description={forecast.description}
                          className="w-6 h-6 text-accent"
                        />
                         <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Droplet className="w-4 h-4"/>
                            <span>{forecast.precipitationChance}%</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="capitalize">{forecast.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                <div className="font-medium w-[70px] text-right">
                  <span>{forecast.high}°</span> /{" "}
                  <span className="text-muted-foreground">
                    {forecast.low}°
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Forecast;
