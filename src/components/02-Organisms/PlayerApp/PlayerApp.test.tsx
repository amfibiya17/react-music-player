import { render, screen, fireEvent } from "@testing-library/react";
import PlayerApp from "./PlayerApp";
import { usePlayerController } from "./hooks/usePlayerController";
import { playerAppText } from "../../../data/ui-text";
import { TRACKS } from "../../../data/track-data";
import type { TrackData } from "../../../types/track";

jest.mock("./hooks/usePlayerController");

jest.mock("../Player/Player", () => ({
  __esModule: true,
  default: ({ audioSrc }: { audioSrc: string | null }) => (
    <div data-testid="player" data-audio-src={audioSrc ?? ""} />
  ),
}));

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
        {track.title ?? track.file}
      </button>
    </li>
  ),
}));

jest.mock("../TransportControls/TransportControls", () => ({
  __esModule: true,
  default: ({
    isPlaying,
    isRepeatEnabled,
  }: {
    isPlaying: boolean;
    isRepeatEnabled: boolean;
  }) => (
    <div
      data-testid="transport-controls"
      data-is-playing={isPlaying}
      data-is-repeat-enabled={isRepeatEnabled}
    />
  ),
}));

jest.mock("../../01-Molecules/ProgressBar/ProgressBar", () => ({
  __esModule: true,
  default: ({
    currentTime,
    duration,
  }: {
    currentTime: number;
    duration: number;
  }) => (
    <div
      data-testid="progress-bar"
      data-current-time={currentTime}
      data-duration={duration}
    />
  ),
}));

jest.mock("../../01-Molecules/VolumeControl/VolumeControl", () => ({
  __esModule: true,
  default: ({
    volume,
    onChange,
  }: {
    volume: number;
    onChange: (value: number) => void;
  }) => (
    <div
      data-testid="volume-control"
      data-volume={volume}
      onClick={() => onChange(0.75)}
    />
  ),
}));

const mockedUsePlayerController = usePlayerController as jest.MockedFunction<
  typeof usePlayerController
>;

type ControllerState = ReturnType<typeof usePlayerController>;

let controllerState: ControllerState;

const setupControllerMock = () => {
  controllerState = {
    selectedIndex: 0,
    isPlaying: true,
    selectedTrack: TRACKS[0],
    volume: 0.5,
    isRepeatEnabled: true,
    handleSelectTrack: jest.fn(),
    handleTogglePlayPause: jest.fn(),
    handlePlayStateChange: jest.fn(),
    handleNextTrack: jest.fn(),
    handlePreviousTrack: jest.fn(),
    handleToggleRepeat: jest.fn(),
    handleChangeVolume: jest.fn(),
  };

  mockedUsePlayerController.mockReturnValue(controllerState);
};

describe("PlayerApp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupControllerMock();
  });

  test("renders title, track list and passes state to children", () => {
    render(<PlayerApp />);

    expect(
      screen.getByRole("heading", { name: playerAppText.title })
    ).toBeInTheDocument();

    const trackButtons = screen.getAllByTestId("track-item");
    expect(trackButtons).toHaveLength(TRACKS.length);

    const selectedButtons = trackButtons.filter(
      (btn) => btn.getAttribute("aria-pressed") === "true"
    );
    expect(selectedButtons).toHaveLength(1);

    const controls = screen.getByTestId("transport-controls");
    expect(controls).toHaveAttribute("data-is-playing", "true");
    expect(controls).toHaveAttribute("data-is-repeat-enabled", "true");

    const player = screen.getByTestId("player");
    expect(player).toHaveAttribute("data-audio-src", TRACKS[0].file);
  });

  test("clicking a track calls handleSelectTrack with the correct index", () => {
    render(<PlayerApp />);

    const trackButtons = screen.getAllByTestId("track-item");

    fireEvent.click(trackButtons[1]);

    expect(controllerState.handleSelectTrack).toHaveBeenCalledTimes(1);
    expect(controllerState.handleSelectTrack).toHaveBeenCalledWith(1);
  });

  test("volume control calls handleChangeVolume when interacted with", () => {
    render(<PlayerApp />);

    const volumeControl = screen.getByTestId("volume-control");
    fireEvent.click(volumeControl);

    expect(controllerState.handleChangeVolume).toHaveBeenCalledTimes(1);
    expect(controllerState.handleChangeVolume).toHaveBeenCalledWith(0.75);
  });
});
