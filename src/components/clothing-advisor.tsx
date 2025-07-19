"use client";

import { useState } from "react";
import type { WeatherData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shirt, Sparkles, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ClothingAdvisorProps = {
  weatherData: WeatherData;
};

const getClothingAdvice = (temperature: number): string => {
  if (temperature > 25) {
    return "Hace calor. Te recomendamos usar: Camisa ligera, pantaloneta y chanclas.";
  } else if (temperature < 15) {
    return "Hace frío. Te recomendamos usar: Abrigo, bufanda y guantes.";
  } else {
    return "El clima está templado. Te recomendamos usar: Camisa de manga larga, jeans y zapatillas.";
  }
};


const ClothingAdvisor = ({ weatherData }: ClothingAdvisorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGetAdvice = () => {
    setIsLoading(true);
    setRecommendation("");
    setIsDialogOpen(true);

    // Simulate a short delay for better UX
    setTimeout(() => {
      const advice = getClothingAdvice(weatherData.current.temperature);
      setRecommendation(advice);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline">Asesor de Ropa</CardTitle>
        <CardDescription>
          Obtén recomendaciones de ropa personalizadas para el clima.
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
                Basado en el clima de {weatherData.location.city}, esto es lo que sugerimos.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">Analizando el clima...</span>
                </div>
              ) : (
                 <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle>Atuendo de Hoy</AlertTitle>
                  <AlertDescription>
                   {recommendation}
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
