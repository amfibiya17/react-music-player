import { render, screen, fireEvent } from "@testing-library/react";
import TrackList from "./TrackList";
import type { TrackData } from "../../../types/track";

jest.mock("../../01-Molecules/Track/Track", () => ({
  __esModule: true,
  default: ({
    track,
    isSelected,
    onSelect,
  }: {
    track: TrackData;
    isSelected: boolean;
    onSelect: () => void;
  }) => (
    <li>
      <button
        type="button"
        data-testid="track-item"
        aria-pressed={isSelected}
        onClick={onSelect}
      >
        {track.title}
      </button>
    </li>
  ),
}));

const tracks: TrackData[] = [
  { id: "t1", title: "Track 1", file: "/audio/t1.mp3" },
  { id: "t2", title: "Track 2", file: "/audio/t2.mp3" },
  { id: "t3", title: "Track 3", file: "/audio/t3.mp3" },
];

describe("TrackList", () => {
  test("renders one Track item per track", () => {
    render(
      <TrackList
        tracks={tracks}
        selectedTrackId={null}
        onSelectTrack={jest.fn()}
      />
    );

    const items = screen.getAllByTestId("track-item");
    expect(items).toHaveLength(tracks.length);

    expect(screen.getByRole("button", { name: "Track 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Track 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Track 3" })).toBeInTheDocument();
  });

  test("marks the selected track using aria-pressed", () => {
    render(
      <TrackList
        tracks={tracks}
        selectedTrackId="t2"
        onSelectTrack={jest.fn()}
      />
    );

    const items = screen.getAllByTestId("track-item");

    expect(items[0]).toHaveAttribute("aria-pressed", "false");
    expect(items[1]).toHaveAttribute("aria-pressed", "true");
    expect(items[2]).toHaveAttribute("aria-pressed", "false");
  });

  test("clicking a track calls onSelectTrack with that track id", () => {
    const onSelectTrack = jest.fn();

    render(
      <TrackList
        tracks={tracks}
        selectedTrackId={null}
        onSelectTrack={onSelectTrack}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Track 2" }));

    expect(onSelectTrack).toHaveBeenCalledTimes(1);
    expect(onSelectTrack).toHaveBeenCalledWith("t2");
  });

  test("renders no items when tracks is empty", () => {
    render(
      <TrackList tracks={[]} selectedTrackId={null} onSelectTrack={jest.fn()} />
    );

    expect(screen.queryAllByTestId("track-item")).toHaveLength(0);
  });
});
