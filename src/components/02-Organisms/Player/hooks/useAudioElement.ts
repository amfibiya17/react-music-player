import { useEffect, useRef } from "react";

export const useAudioElement = (
  audioSrc: string | null,
  isPlaying: boolean,
  volume: number,
  isRepeatEnabled: boolean,
  seekTime: number | null,
  onPlayStateChange?: (playing: boolean) => void,
  onTimeChange?: (currentTime: number, duration: number) => void
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !audioSrc) return;

    const safeVolume = Math.max(0, Math.min(1, volume));
    audio.volume = safeVolume;

    if (isPlaying) {
      void audio.play();
    } else {
      audio.pause();
    }
  }, [audioSrc, isPlaying, volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;
    if (seekTime == null) return;

    audio.currentTime = seekTime;
  }, [seekTime]);

  const emitTime = () => {
    if (!onTimeChange) return;

    const audio = audioRef.current;
    if (!audio) return;

    const current = audio.currentTime ?? 0;
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;

    onTimeChange(current, duration);
  };

  const handlePlay = () => {
    onPlayStateChange?.(true);
  };

  const handlePause = () => {
    onPlayStateChange?.(false);
  };

  const handleEnded = () => {
    const audio = audioRef.current;

    if (!audio) {
      onPlayStateChange?.(false);
      return;
    }

    if (isRepeatEnabled && audioSrc) {
      audio.currentTime = 0;
      void audio.play();
      onPlayStateChange?.(true);
    } else {
      onPlayStateChange?.(false);
    }
  };

  const handleTimeUpdate = () => {
    emitTime();
  };

  const handleLoadedMetadata = () => {
    emitTime();
  };

  return {
    audioRef,
    handlePlay,
    handlePause,
    handleEnded,
    handleTimeUpdate,
    handleLoadedMetadata,
  };
};
