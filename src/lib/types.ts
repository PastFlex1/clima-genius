export type LocationData = {
  city: string;
  country: string;
};

export type CurrentWeather = {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
};

export type HourlyForecast = {
  time: string;
  temperature: number;
  description: string;
};

export type DailyForecast = {
  day: string;
  high: number;
  low: number;
  description: string;
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
