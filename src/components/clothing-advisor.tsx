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
        throw new Error("Failed to get advice.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get clothing advice. Please try again.",
      });
      setIsDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline">AI Clothing Advisor</CardTitle>
        <CardDescription>
          Get personalized clothing recommendations from our AI stylist.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
        <Shirt className="w-16 h-16 text-primary drop-shadow-lg" />
        <p className="text-muted-foreground">
          Unsure what to wear? Let AI help you dress for the weather.
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleGetAdvice} disabled={isLoading} size="lg">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get Style Advice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Your Style Recommendation</DialogTitle>
              <DialogDescription>
                Based on the weather in {weatherData.location.city}, here's what our AI stylist suggests.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-muted-foreground">Generating your personalized advice...</span>
                </div>
              ) : (
                 <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle>Today's Outfit</AlertTitle>
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
