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
import { Skeleton } from "./ui/skeleton";

const WeatherDashboard = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>(CITIES_DATA[0].id);
  const [currentHour, setCurrentHour] = useState<number | undefined>(undefined);
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

  useEffect(() => {
    if (currentHour === undefined || !weatherData) return;

    const [sunriseHour] = weatherData.current.sunrise.split(':').map(Number);
    const [sunsetHour] = weatherData.current.sunset.split(':').map(Number);
    
    const docElement = document.documentElement;
  
    docElement.classList.remove(
      "theme-dawn", "theme-sunrise", "theme-morning", "theme-midday", 
      "theme-afternoon", "theme-sunset", "theme-night", "light", "dark"
    );

    if (currentHour >= 0 && currentHour < sunriseHour - 1) { // Madrugada
      docElement.classList.add("theme-dawn");
    } else if (currentHour >= sunriseHour - 1 && currentHour < sunriseHour + 1) { // Amanecer
      docElement.classList.add("theme-sunrise");
    } else if (currentHour >= sunriseHour + 1 && currentHour < 12) { // Mañana
      docElement.classList.add("theme-morning");
    } else if (currentHour >= 12 && currentHour < 15) { // Mediodía
      docElement.classList.add("theme-midday");
    } else if (currentHour >= 15 && currentHour < sunsetHour - 1) { // Tarde
      docElement.classList.add("theme-afternoon");
    } else if (currentHour >= sunsetHour - 1 && currentHour < sunsetHour + 1) { // Atardecer
      docElement.classList.add("theme-sunset");
    } else { // Noche
      docElement.classList.add("theme-night");
    }
  
  }, [currentHour, weatherData]);
  
  if (!isClient) {
    return (
        <div className="space-y-6 container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Skeleton className="h-10 w-full sm:w-auto sm:max-w-xs" />
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="lg:col-span-2 h-[400px]" />
              <Skeleton className="lg:col-span-1 h-[400px]" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="lg:col-span-2 h-[400px]" />
              <Skeleton className="lg:col-span-1 h-[400px]" />
            </div>
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
