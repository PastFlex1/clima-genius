"use server";

import { clothingAdvisor } from "@/ai/flows/clothing-advisor";
import type { CurrentWeather, DailyForecast } from "@/lib/types";

type GetClothingAdviceParams = {
  location: string;
  currentWeather: CurrentWeather;
  dailyForecast: DailyForecast[];
};

export async function getClothingAdviceAction({
  location,
  currentWeather,
  dailyForecast,
}: GetClothingAdviceParams) {
  try {
    const forecastText = dailyForecast
      .map(
        (day) => `${day.day}: ${day.description}, Máx ${day.high}°C, Mín ${day.low}°C.`
      )
      .join(" ");

    const result = await clothingAdvisor({
      location,
      temperature: currentWeather.temperature,
      humidity: currentWeather.humidity,
      windSpeed: currentWeather.windSpeed,
      weatherDescription: currentWeather.description,
      forecast: forecastText,
    });
    return result;
  } catch (error) {
    console.error("Error in getClothingAdviceAction:", error);
    return { recommendation: "Lo siento, no pude generar un consejo en este momento. Por favor, inténtalo de nuevo más tarde." };
  }
}
