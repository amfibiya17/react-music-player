import { useState } from "react";
import type { TrackData } from "../../../../types/track";

export const usePlayerController = (tracks: TrackData[]) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(
    tracks[0]?.id ?? null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);

  const selectedIndex =
    selectedTrackId === null
      ? 0
      : tracks.findIndex((track) => track.id === selectedTrackId);

  const safeIndex = selectedIndex >= 0 ? selectedIndex : 0;

  const selectedTrack = tracks.length > 0 ? tracks[safeIndex] : null;

  const handleSelectTrack = (id: string) => {
    if (id === selectedTrackId) return;
    setSelectedTrackId(id);
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

    const currentIndex = selectedIndex >= 0 ? selectedIndex : 0;
    const nextIndex = (currentIndex + 1) % tracks.length;
    setSelectedTrackId(tracks[nextIndex].id);
  };

  const handlePreviousTrack = () => {
    if (tracks.length === 0) return;

    const currentIndex = selectedIndex >= 0 ? selectedIndex : 0;
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setSelectedTrackId(tracks[prevIndex].id);
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
