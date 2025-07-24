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
import { Calendar as CalendarIcon, Thermometer, Wind, Umbrella, CloudSun, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { getClothingAdvice } from "@/lib/clothing-advice";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Calendar } from "./ui/calendar";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      setIsDialogOpen(false); // Close dialog on select
    } else {
        // Handle case where date is selected but not in forecast
        setSelectedDay({
            date: date,
            day: format(date, "EEE", {locale: es}),
            description: "No disponible",
            high: 0,
            low: 0,
            precipitationChance: 0
        })
        setRecommendation(null);
    }
    setIsDialogOpen(false);
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDay
                ? format(selectedDay.date, "PPP", { locale: es })
                : "Elige una fecha"}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-auto p-0" showCloseButton={false}>
             <DialogHeader className="sr-only">
              <DialogTitle>Seleccionar una fecha</DialogTitle>
              <DialogDescription>
                Elige una fecha del calendario para ver la previsión meteorológica y las recomendaciones de ropa.
              </DialogDescription>
            </DialogHeader>
            <Calendar
              mode="single"
              selected={selectedDay?.date}
              onSelect={handleDaySelect}
              initialFocus
              locale={es}
            />
          </DialogContent>
        </Dialog>

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
