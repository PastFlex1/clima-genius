"use client";

import React, { useState } from "react";
import type { DailyForecast } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Sparkles, Thermometer, Wind, Umbrella, CloudSun, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { getClothingAdvice } from "@/lib/clothing-advice";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type WeeklyPlannerProps = {
  dailyForecasts: DailyForecast[];
};

const WeeklyPlanner = ({ dailyForecasts }: WeeklyPlannerProps) => {
  const [selectedDay, setSelectedDay] = useState<DailyForecast | null>(null);
  const [recommendation, setRecommendation] = useState<ReturnType<
    typeof getClothingAdvice
  > | null>(null);

  const handleDaySelect = (date: Date | undefined) => {
    if (!date) return;
    const selected = dailyForecasts.find(
      (day) => day.date.toDateString() === date.toDateString()
    );

    if (selected) {
      setSelectedDay(selected);
      const advice = getClothingAdvice({
        description: selected.description,
        temperature: (selected.high + selected.low) / 2,
        windSpeed: 0, // Mock windspeed as it's not in daily data
      });
      setRecommendation(advice);
    }
  };
  
  const IconMap: { [key: string]: React.ElementType } = {
    "Soleado y Despejado": Thermometer,
    "Parcialmente Nublado": CloudSun,
    "Nublado": CloudSun,
    "Lluvioso": Umbrella,
    "Ventoso": Wind,
    "Niebla / Neblina": Eye,
  };


  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline">Planificador Semanal</CardTitle>
        <CardDescription>
          Selecciona un día para obtener un consejo de ropa.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="lg">
              <Calendar className="mr-2 h-4 w-4" />
              {selectedDay
                ? format(selectedDay.date, "PPP", { locale: es })
                : "Elige una fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <DayPicker
              mode="single"
              selected={selectedDay?.date}
              onSelect={handleDaySelect}
              disabled={(date) => {
                const today = new Date();
                const futureDate = new Date();
                futureDate.setDate(today.getDate() + 7);
                return date < today || date > futureDate;
              }}
              initialFocus
              locale={es}
            />
          </PopoverContent>
        </Popover>

        {recommendation && (
          <div className="w-full mt-4">
             <Alert>
                  {IconMap[recommendation.title] && (
                    React.createElement(IconMap[recommendation.title], { className: "h-4 w-4" })
                  )}
                  <AlertTitle>{recommendation.title}</AlertTitle>
                  <AlertDescription>
                   <ul className="mt-2 list-disc list-inside text-left space-y-1">
                      {recommendation.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyPlanner;