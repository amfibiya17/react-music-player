import { useAudioElement } from "./hooks/useAudioElement";

export type PlayerProps = {
  audioSrc: string | null;
  isPlaying: boolean;
  volume: number;
  isRepeatEnabled: boolean;
  seekTime: number | null;
  onPlayStateChange?: (playing: boolean) => void;
  onTimeChange?: (currentTime: number, duration: number) => void;
};

const Player = ({
  audioSrc,
  isPlaying,
  volume,
  isRepeatEnabled,
  seekTime,
  onPlayStateChange,
  onTimeChange,
}: PlayerProps) => {
  const {
    audioRef,
    handlePlay,
    handlePause,
    handleEnded,
    handleTimeUpdate,
    handleLoadedMetadata,
  } = useAudioElement(
    audioSrc,
    isPlaying,
    volume,
    isRepeatEnabled,
    seekTime,
    onPlayStateChange,
    onTimeChange
  );

  return (
    <audio
      aria-hidden="true"
      ref={audioRef}
      src={audioSrc ?? undefined}
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      data-testid="audio-element"
    />
  );
};

export default Player;
