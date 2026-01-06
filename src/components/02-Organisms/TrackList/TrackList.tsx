import Track from "../../01-Molecules/Track/Track";
import type { TrackData } from "../../../types/track";

type TrackListProps = {
  tracks: TrackData[];
  selectedTrackId: string | null;
  onSelectTrack: (id: string) => void;
};

const TrackList = ({
  tracks,
  selectedTrackId,
  onSelectTrack,
}: TrackListProps) => {
  return (
    <ul className="bg-base-100 w-full p-2 rounded-lg">
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          isSelected={track.id === selectedTrackId}
          onSelect={() => onSelectTrack(track.id)}
        />
      ))}
    </ul>
  );
};

export default TrackList;
