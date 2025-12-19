import { useState } from "react";
import Player from "../Player/Player";
import Track from "../../01-Molecules/Track/Track";
import { TRACKS } from "../../../data/track-data";
import { usePlayerController } from "./hooks/usePlayerController";
import { playerAppText } from "../../../data/ui-text";
import TransportControls from "../TransportControls/TransportControls";
import ProgressBar from "../../01-Molecules/ProgressBar/ProgressBar";
import VolumeControl from "../../01-Molecules/VolumeControl/VolumeControl";

const PlayerApp = () => {
  const {
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
  } = usePlayerController(TRACKS);

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

  return (
    <main className="card bg-base-200 border border-base-300 shadow-lg w-full max-w-sm mx-auto p-6">
      <header className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-semibold m-0 hover:text-primary transition-colors">
          {playerAppText.title}
        </h1>
      </header>

      <section aria-label={playerAppText.trackListLabel} className="mb-4">
        <ul className="bg-base-100 w-full p-2 rounded-lg">
          {TRACKS.map((track, index) => (
            <Track
              key={track.file}
              track={track}
              isSelected={index === selectedIndex}
              onSelect={() => handleSelectTrack(index)}
            />
          ))}
        </ul>
      </section>

      <section aria-label={playerAppText.controlsLabel} className="mb-2">
        <TransportControls
          isPlaying={isPlaying}
          isRepeatEnabled={isRepeatEnabled}
          onTogglePlay={handleTogglePlayPause}
          onPrevious={handlePreviousTrack}
          onNext={handleNextTrack}
          onToggleRepeat={handleToggleRepeat}
        />
      </section>

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />

      <VolumeControl volume={volume} onChange={handleChangeVolume} />

      <Player
        audioSrc={selectedTrack?.file ?? null}
        isPlaying={isPlaying}
        volume={volume}
        isRepeatEnabled={isRepeatEnabled}
        seekTime={seekTime}
        onPlayStateChange={handlePlayStateChange}
        onTimeChange={handleTimeChange}
      />
    </main>
  );
};

export default PlayerApp;
