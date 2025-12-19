import { playPauseButtonText } from "../../../data/ui-text";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";

export type PlayPauseButtonProps = {
  isPlaying: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

const PlayPauseButton = ({
  isPlaying,
  onToggle,
  disabled = false,
}: PlayPauseButtonProps) => {
  const label = isPlaying
    ? playPauseButtonText.pauseLabel
    : playPauseButtonText.playLabel;

  return (
    <button
      type="button"
      className="btn btn-primary btn-circle btn-sm shadow-none hover:scale-110 hover:bg-primary-focus transition-all duration-200"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={isPlaying}
      aria-label={label}
    >
      {isPlaying ? (
        <PauseIcon width={32} height={32} />
      ) : (
        <PlayIcon width={32} height={32} />
      )}
    </button>
  );
};

export default PlayPauseButton;
