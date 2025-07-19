"use client";

import { useState } from "react";
import type { WeatherData } from "@/lib/types";
import { getClothingAdviceAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shirt, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

const ClothingAdvisor = ({ weatherData }: ClothingAdvisorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleGetAdvice = async () => {
    setIsLoading(true);
    setRecommendation("");
    setIsDialogOpen(true);
    try {
      const result = await getClothingAdviceAction({
        location: weatherData.location.city,
        currentWeather: weatherData.current,
        dailyForecast: weatherData.daily,
      });
      if (result?.recommendation) {
        setRecommendation(result.recommendation);
      } else {
        throw new Error("No se pudieron obtener consejos.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo obtener el consejo de ropa. Por favor, inténtalo de nuevo.",
      });
      setIsDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline">Asesor de Ropa con IA</CardTitle>
        <CardDescription>
          Obtén recomendaciones de ropa personalizadas de nuestro estilista de IA.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
        <Shirt className="w-16 h-16 text-primary drop-shadow-lg" />
        <p className="text-muted-foreground">
          ¿No sabes qué ponerte? Deja que la IA te ayude a vestirte para el clima.
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
                Basado en el clima de {weatherData.location.city}, esto es lo que sugiere nuestro estilista de IA.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">Generando tu consejo personalizado...</span>
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
