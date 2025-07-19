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
        (day) => `${day.day}: ${day.description}, High ${day.high}°C, Low ${day.low}°C.`
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
    return { recommendation: "Sorry, I couldn't generate advice right now. Please try again later." };
  }
}
