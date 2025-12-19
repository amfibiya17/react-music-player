import type { ChangeEvent } from "react";
import { progressBarText } from "../../../data/ui-text";

export type ProgressBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
};

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const whole = Math.floor(seconds);
  const minutes = Math.floor(whole / 60);
  const remainingSeconds = whole % 60;
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
};

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const safeCurrent = Math.min(currentTime, safeDuration);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    onSeek(value);
  };

  return (
    <section
      aria-label={progressBarText.timelineLabel}
      className="w-full mt-2 mb-2"
    >
      <input
        type="range"
        min={0}
        max={safeDuration || 0}
        step={1}
        value={safeCurrent}
        onChange={handleChange}
        disabled={safeDuration === 0}
        className="range range-xs range-primary w-full"
      />

      <div className="flex justify-between text-xs mt-1">
        <span>{formatTime(safeCurrent)}</span>
        <span>{formatTime(safeDuration)}</span>
      </div>
    </section>
  );
};

export default ProgressBar;
