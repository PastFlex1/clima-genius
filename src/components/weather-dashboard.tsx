"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { CITIES_DATA } from "@/lib/mock-data";
import type { WeatherData } from "@/lib/types";
import CurrentWeather from "./current-weather";
import Forecast from "./forecast";
import WeatherHistoryChart from "./weather-history-chart";
import ClothingAdvisor from "./clothing-advisor";
import LiveClock from "./live-clock";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

const WeatherDashboard = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>(CITIES_DATA[0].id);
  const [currentHour, setCurrentHour] = useState<number>(-1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const weatherData = useMemo(() => {
    return CITIES_DATA.find((city) => city.id === selectedCityId) || CITIES_DATA[0];
  }, [selectedCityId]);

  const handleTimeUpdate = useCallback((date: Date) => {
    setCurrentHour(date.getHours());
  }, []);
  
  if (!isClient) {
    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-primary animate-pulse">Cargando datos del clima...</div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="w-full sm:w-auto sm:max-w-xs">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Select onValueChange={setSelectedCityId} defaultValue={selectedCityId}>
              <SelectTrigger className="w-full pl-10 shadow-md">
                <SelectValue placeholder="Selecciona una ciudad" />
              </SelectTrigger>
              <SelectContent>
                {CITIES_DATA.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.location.city}, {city.location.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <LiveClock timeZone={weatherData.location.timeZone} onTimeUpdate={handleTimeUpdate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CurrentWeather city={weatherData.location.city} data={weatherData.current} currentHour={currentHour} />
        </div>
        <div className="lg:col-span-1">
          <ClothingAdvisor weatherData={weatherData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Forecast hourly={weatherData.hourly} daily={weatherData.daily} currentHour={currentHour} />
        </div>
        <div className="lg:col-span-1">
          <WeatherHistoryChart data={weatherData.history} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
