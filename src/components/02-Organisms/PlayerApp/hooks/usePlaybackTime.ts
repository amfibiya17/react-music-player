import { useState } from "react";

export const usePlaybackTime = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState<number | null>(null);

  const handleTimeChange = (time: number, total: number) => {
    setCurrentTime(time);
    setDuration(total);
  };

  const handleSeek = (time: number) => {
    setSeekTime(time);
    setCurrentTime(time);
  };

  return {
    currentTime,
    duration,
    seekTime,
    handleTimeChange,
    handleSeek,
  };
};
