import type { ChangeEvent } from "react";
import { volumeControlText } from "../../../data/ui-text";
import VolumeUpIcon from "../../00-Atoms/icons/VolumeUpIcon";
import VolumeDownIcon from "../../00-Atoms/icons/VolumeDownIcon";

export type VolumeControlProps = {
  volume: number;
  onChange: (volume: number) => void;
};

const VolumeControl = ({ volume, onChange }: VolumeControlProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = Number(event.target.value);
    const next = Math.max(0, Math.min(100, raw));
    onChange(next / 100);
  };

  const sliderValue = Math.round(volume * 100);

  return (
    <section aria-label={volumeControlText.label} className="mt-2">
      <div className="flex items-center gap-2">
        <VolumeDownIcon width={16} height={16} />

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={sliderValue}
          onChange={handleChange}
          aria-label={volumeControlText.label}
          className="range range-xs range-warning flex-1"
        />

        <VolumeUpIcon width={16} height={16} />
      </div>
    </section>
  );
};

export default VolumeControl;
