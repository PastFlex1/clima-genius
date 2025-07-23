"use client";

import { useState, useEffect } from "react";
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
  hour: number | undefined;
}

const WeatherIcon = ({ description, hour, ...props }: WeatherIconProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const desc = description.toLowerCase();

  if (desc.includes("soleado") || desc.includes("despejado")) {
    if (!isClient || hour === undefined) {
      // Render a default icon on the server to avoid mismatch
      return <Sun {...props} />;
    }
    if (hour > 19 || hour < 6) {
      return <Moon {...props} />;
    }
    return <Sun {...props} />;
  }
  if (desc.includes("parcialmente nublado")) return <Cloudy {...props} />;
  if (desc.includes("nublado")) return <Cloud {...props} />;
  if (
    desc.includes("lluvia") ||
    desc.includes("llovizna") ||
    desc.includes("chubascos")
  ) {
    return <CloudRain {...props} />;
  }
  if (desc.includes("nieve")) return <CloudSnow {...props} />;
  if (desc.includes("tormentas")) return <CloudLightning {...props} />;
  if (desc.includes("viento")) return <Wind {...props} />;

  return <Cloudy {...props} />;
};

export default WeatherIcon;
