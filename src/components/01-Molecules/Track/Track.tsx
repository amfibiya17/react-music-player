import type { TrackData } from "../../../types/track";

export type TrackProps = {
  track: TrackData;
  isSelected: boolean;
  onSelect: () => void;
};

const Track = ({ track, isSelected, onSelect }: TrackProps) => {
  return (
    <li
      className={`transition-colors
        ${
          isSelected ? "bg-primary text-primary-content" : "hover:bg-base-300"
        }`}
    >
      <button
        type="button"
        onClick={onSelect}
        data-testid="track-button"
        className="w-full text-left px-4 py-2 bg-transparent border-none text-sm cursor-pointer"
      >
        {track.title}
      </button>
    </li>
  );
};

export default Track;
