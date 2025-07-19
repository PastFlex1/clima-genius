"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

type LiveClockProps = {
  onTimeUpdate?: (date: Date) => void;
};

const LiveClock = ({ onTimeUpdate }: LiveClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
      if (onTimeUpdate) {
        onTimeUpdate(newTime);
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [onTimeUpdate]);

  return (
    <div className="flex items-center justify-center gap-2 text-lg font-medium text-muted-foreground p-2 bg-muted/50 rounded-md">
      <Clock className="h-5 w-5" />
      <span>
        {time.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default LiveClock;
