"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

type LiveClockProps = {
  timeZone: string;
  onTimeUpdate?: (date: Date) => void;
};

const LiveClock = ({ timeZone, onTimeUpdate }: LiveClockProps) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const getInitialTime = () => {
      const now = new Date();
      const localTime = new Date(now.toLocaleString("en-US", { timeZone }));
      setTime(localTime);
      if (onTimeUpdate) {
        onTimeUpdate(localTime);
      }
    };
    
    getInitialTime();
    
    const timerId = setInterval(() => {
       const now = new Date();
       const localTime = new Date(now.toLocaleString("en-US", { timeZone }));
       setTime(localTime);
       if (onTimeUpdate) {
        onTimeUpdate(localTime);
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeZone, onTimeUpdate]);

  return (
    <div className="flex items-center justify-center gap-2 text-lg font-medium text-muted-foreground p-2 bg-muted/50 rounded-md min-w-[100px] h-[40px]">
      <Clock className="h-5 w-5" />
      <span>
        {time ? time.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }) : "--:--"}
      </span>
    </div>
  );
};

export default LiveClock;
