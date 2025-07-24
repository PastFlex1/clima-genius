"use client";

import React, { useState } from "react";
import type { WeatherData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shirt, Sparkles, Loader2, Thermometer, Wind, Umbrella, CloudSun, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getClothingAdvice } from "@/lib/clothing-advice";

type ClothingAdvisorProps = {
  weatherData: WeatherData;
};

const ClothingAdvisor = ({ weatherData }: ClothingAdvisorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<ReturnType<typeof getClothingAdvice> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGetAdvice = () => {
    setIsLoading(true);
    setRecommendation(null);
    setIsDialogOpen(true);

    setTimeout(() => {
      const advice = getClothingAdvice({
        description: weatherData.current.description,
        temperature: weatherData.current.temperature,
        windSpeed: weatherData.current.windSpeed,
      });
      setRecommendation(advice);
      setIsLoading(false);
    }, 500);
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
        <CardTitle className="font-headline">Asesor de Ropa</CardTitle>
        <CardDescription>
          Consejos de ropa para el clima de hoy.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
        <Shirt className="w-16 h-16 text-primary drop-shadow-lg" />
        <p className="text-muted-foreground">
          ¿No sabes qué ponerte? Te ayudamos a decidir.
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleGetAdvice} disabled={isLoading} size="lg">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Obtener Consejo de Estilo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tu Recomendación de Estilo</DialogTitle>
              <DialogDescription>
                Basado en el clima actual de {weatherData.location.city}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isLoading && (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">Analizando el clima...</span>
                </div>
              )}
              {recommendation && (
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
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ClothingAdvisor;
