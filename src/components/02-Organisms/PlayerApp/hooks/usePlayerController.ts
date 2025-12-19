import { useState } from "react";
import type { TrackData } from "../../../../types/track";

export const usePlayerController = (tracks: TrackData[]) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);

  const selectedTrack = tracks[selectedIndex] ?? null;

  const handleSelectTrack = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
  };

  const handleTogglePlayPause = () => {
    if (!selectedTrack) return;
    setIsPlaying((prev) => !prev);
  };

  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  const handleNextTrack = () => {
    if (tracks.length === 0) return;

    const nextIndex = (selectedIndex + 1) % tracks.length;
    setSelectedIndex(nextIndex);
  };

  const handlePreviousTrack = () => {
    if (tracks.length === 0) return;

    const prevIndex = (selectedIndex - 1 + tracks.length) % tracks.length;

    setSelectedIndex(prevIndex);
  };

  const handleToggleRepeat = () => {
    setIsRepeatEnabled((prev) => !prev);
  };

  const handleChangeVolume = (newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolume(clamped);
  };

  return {
    selectedIndex,
    isPlaying,
    selectedTrack,
    volume,
    isRepeatEnabled,
    handleSelectTrack,
    handleTogglePlayPause,
    handlePlayStateChange,
    handleNextTrack,
    handlePreviousTrack,
    handleToggleRepeat,
    handleChangeVolume,
  };
};
