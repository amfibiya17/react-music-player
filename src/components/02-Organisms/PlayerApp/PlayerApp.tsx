import Player from "../Player/Player";
import { TRACKS } from "../../../data/track-data";
import { usePlayerController } from "./hooks/usePlayerController";
import { usePlaybackTime } from "./hooks/usePlaybackTime";
import { playerAppText } from "../../../data/ui-text";
import TransportControls from "../TransportControls/TransportControls";
import ProgressBar from "../../01-Molecules/ProgressBar/ProgressBar";
import VolumeControl from "../../01-Molecules/VolumeControl/VolumeControl";
import TrackList from "../TrackList/TrackList";

const PlayerApp = () => {
  const {
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

  const { currentTime, duration, seekTime, handleTimeChange, handleSeek } =
    usePlaybackTime();

  return (
    <main className="card bg-base-200 border border-base-300 shadow-lg w-full max-w-sm mx-auto p-6">
      <header className="flex items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-semibold m-0 hover:text-primary transition-colors">
          {playerAppText.title}
        </h1>
      </header>

      <section aria-label={playerAppText.trackListLabel} className="mb-4">
        <TrackList
          tracks={TRACKS}
          selectedTrackId={selectedTrack?.id ?? null}
          onSelectTrack={handleSelectTrack}
        />
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
