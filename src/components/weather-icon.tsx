"use client";

import {
  Sun,
  Cloud,
  CloudRain,
  Cloudy,
  CloudSnow,
  CloudLightning,
  Wind,
  Moon,
  type LucideProps,
} from "lucide-react";

interface WeatherIconProps extends LucideProps {
  description: string;
}

const WeatherIcon = ({ description, ...props }: WeatherIconProps) => {
  const desc = description.toLowerCase();

  if (desc.includes("sunny") || desc.includes("clear")) {
    // Basic check for night time
    const hour = new Date().getHours();
    if (hour > 19 || hour < 6) {
      return <Moon {...props} />;
    }
    return <Sun {...props} />;
  }
  if (desc.includes("partly cloudy")) return <Cloudy {...props} />;
  if (desc.includes("cloudy")) return <Cloud {...props} />;
  if (
    desc.includes("rain") ||
    desc.includes("drizzle") ||
    desc.includes("showers")
  ) {
    return <CloudRain {...props} />;
  }
  if (desc.includes("snow")) return <CloudSnow {...props} />;
  if (desc.includes("thunderstorm")) return <CloudLightning {...props} />;
  if (desc.includes("wind")) return <Wind {...props} />;

  return <Cloudy {...props} />; // Default icon
};

export default WeatherIcon;
