import { render, screen, fireEvent } from "@testing-library/react";
import Player from "./Player";
import { useAudioElement } from "./hooks/useAudioElement";

jest.mock("./hooks/useAudioElement");

const mockedUseAudioElement = useAudioElement as jest.MockedFunction<
  typeof useAudioElement
>;

describe("Player", () => {
  beforeEach(() => {
    mockedUseAudioElement.mockReturnValue({
      audioRef: { current: null },
      handlePlay: jest.fn(),
      handlePause: jest.fn(),
      handleEnded: jest.fn(),
      handleTimeUpdate: jest.fn(),
      handleLoadedMetadata: jest.fn(),
    });
  });

  test("renders an audio element with the correct src", () => {
    render(
      <Player
        audioSrc="test.mp3"
        isPlaying={false}
        volume={1}
        isRepeatEnabled={false}
        seekTime={null}
      />
    );

    const audio = screen.getByTestId("audio-element");
    expect(audio).toHaveAttribute("src", "test.mp3");
  });

  test("renders an audio element with no src when audioSrc is null", () => {
    render(
      <Player
        audioSrc={null}
        isPlaying={false}
        volume={1}
        isRepeatEnabled={false}
        seekTime={null}
      />
    );

    const audio = screen.getByTestId("audio-element");
    expect(audio).not.toHaveAttribute("src", "test.mp3");
  });

  test("calls hook handlers when audio events fire", () => {
    const handlePlay = jest.fn();
    const handlePause = jest.fn();
    const handleEnded = jest.fn();
    const handleTimeUpdate = jest.fn();
    const handleLoadedMetadata = jest.fn();

    mockedUseAudioElement.mockReturnValue({
      audioRef: { current: null },
      handlePlay,
      handlePause,
      handleEnded,
      handleTimeUpdate,
      handleLoadedMetadata,
    });

    render(
      <Player
        audioSrc="test.mp3"
        isPlaying={false}
        volume={1}
        isRepeatEnabled={false}
        seekTime={null}
      />
    );

    const audio = screen.getByTestId("audio-element");

    fireEvent.play(audio);
    fireEvent.pause(audio);
    fireEvent.ended(audio);
    fireEvent.timeUpdate(audio);
    fireEvent.loadedMetadata(audio);

    expect(handlePlay).toHaveBeenCalledTimes(1);
    expect(handlePause).toHaveBeenCalledTimes(1);
    expect(handleEnded).toHaveBeenCalledTimes(1);
    expect(handleTimeUpdate).toHaveBeenCalledTimes(1);
    expect(handleLoadedMetadata).toHaveBeenCalledTimes(1);
  });
});
