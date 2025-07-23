export type LocationData = {
  city: string;
  country: string;
  timeZone: string;
};

export type CurrentWeather = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  dewPoint: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  description: string;
};

export type HourlyForecast = {
  time: string;
  temperature: number;
  description: string;
  precipitationChance: number;
  windSpeed: number;
};

export type DailyForecast = {
  day: string;
  high: number;
  low: number;
  description: string;
  precipitationChance: number;
};

export type HistoricalData = {
  date: string;
  avgTemp: number;
};

export type WeatherData = {
  id: string;
  location: LocationData;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  history: HistoricalData[];
};
