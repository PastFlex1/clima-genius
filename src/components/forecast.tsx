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

type ForecastProps = {
  hourly: HourlyForecast[];
  daily: DailyForecast[];
};

const Forecast = ({ hourly, daily }: ForecastProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline">Forecast</CardTitle>
        <CardDescription>
          Hourly and daily outlook for the upcoming week.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2 text-primary-foreground/90">
            Next 8 Hours
          </h3>
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {hourly.map((forecast, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center min-w-[80px] p-2 bg-secondary/50 rounded-lg"
                >
                  <p className="text-sm text-muted-foreground">
                    {forecast.time}
                  </p>
                  <WeatherIcon
                    description={forecast.description}
                    className="w-8 h-8 my-1 text-accent"
                  />
                  <p className="font-bold text-lg">{forecast.temperature}°</p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2 text-primary-foreground/90">
            Next 7 Days
          </h3>
          <ul className="space-y-2">
            {daily.map((forecast, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50"
              >
                <span className="font-medium w-1/4">{forecast.day}</span>
                <WeatherIcon
                  description={forecast.description}
                  className="w-6 h-6 text-accent mx-2"
                />
                <span className="text-sm text-muted-foreground w-1/4 text-center">
                  {forecast.description}
                </span>
                <div className="font-medium w-1/4 text-right">
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
