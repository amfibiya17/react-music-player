import PlayPauseButton from "../../00-Atoms/PlayPauseButton/PlayPauseButton";
import PreviousIcon from "../../00-Atoms/icons/PreviousIcon";
import NextIcon from "../../00-Atoms/icons/NextIcon";
import { transportControlsText } from "../../../data/ui-text";
import RepeatOnIcon from "../../00-Atoms/icons/RepeatOnIcon";
import RepeatOffIcon from "../../00-Atoms/icons/RepeatOffIcon";

export type TransportControlsProps = {
  isPlaying: boolean;
  isRepeatEnabled: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleRepeat: () => void;
};

const TransportControls = ({
  isPlaying,
  isRepeatEnabled,
  onTogglePlay,
  onPrevious,
  onNext,
  onToggleRepeat,
}: TransportControlsProps) => {
  const repeatLabel = isRepeatEnabled
    ? transportControlsText.repeatOnLabel
    : transportControlsText.repeatOffLabel;

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={onPrevious}
        aria-label={transportControlsText.previousLabel}
        className="btn btn-accent btn-circle btn-sm shadow-none hover:scale-110 hover:bg-accent-focus transition-all duration-200"
      >
        <PreviousIcon width={32} height={32} />
      </button>

      <PlayPauseButton isPlaying={isPlaying} onToggle={onTogglePlay} />

      <button
        type="button"
        onClick={onNext}
        aria-label={transportControlsText.nextLabel}
        className="btn btn-accent btn-circle btn-sm shadow-none hover:scale-110 hover:bg-accent-focus transition-all duration-200"
      >
        <NextIcon width={32} height={32} />
      </button>

      <button
        type="button"
        onClick={onToggleRepeat}
        aria-pressed={isRepeatEnabled}
        aria-label={repeatLabel}
        className={`btn btn-warning btn-circle btn-sm shadow-none hover:scale-110 hover:bg-warning-focus transition-all duration-200`}
      >
        {isRepeatEnabled ? (
          <RepeatOnIcon width={32} height={32} />
        ) : (
          <RepeatOffIcon width={32} height={32} />
        )}
      </button>
    </div>
  );
};

export default TransportControls;
