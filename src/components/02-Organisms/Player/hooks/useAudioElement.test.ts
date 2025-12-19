import { renderHook, act } from "@testing-library/react";
import { useAudioElement } from "./useAudioElement";

describe("useAudioElement", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("emits play state changes via handlers", () => {
    const onPlayStateChange = jest.fn();

    const { result } = renderHook(() =>
      useAudioElement("test.mp3", false, 1, false, null, onPlayStateChange)
    );

    act(() => {
      result.current.handlePlay();
    });
    expect(onPlayStateChange).toHaveBeenCalledWith(true);

    act(() => {
      result.current.handlePause();
    });
    expect(onPlayStateChange).toHaveBeenCalledWith(false);
  });

  test("emits time updates when audio element exists", () => {
    const onTimeChange = jest.fn();

    const { result } = renderHook(() =>
      useAudioElement(
        "test.mp3",
        false,
        1,
        false,
        null,
        undefined,
        onTimeChange
      )
    );

    act(() => {
      result.current.audioRef.current = {
        currentTime: 12.5,
        duration: 100,
      } as unknown as HTMLAudioElement;
    });

    act(() => {
      result.current.handleTimeUpdate();
    });

    expect(onTimeChange).toHaveBeenCalledWith(12.5, 100);
  });

  test("handleEnded sets playing=false when audio element is missing", () => {
    const onPlayStateChange = jest.fn();

    const { result } = renderHook(() =>
      useAudioElement("test.mp3", true, 1, false, null, onPlayStateChange)
    );

    act(() => {
      result.current.handleEnded();
    });

    expect(onPlayStateChange).toHaveBeenCalledWith(false);
  });

  test("handleEnded restarts when repeat is enabled", () => {
    const onPlayStateChange = jest.fn();
    const play = jest.fn();

    const { result } = renderHook(() =>
      useAudioElement("test.mp3", true, 1, true, null, onPlayStateChange)
    );

    act(() => {
      result.current.audioRef.current = {
        currentTime: 55,
        duration: 100,
        play,
      } as unknown as HTMLAudioElement;
    });

    act(() => {
      result.current.handleEnded();
    });

    expect(
      (result.current.audioRef.current as HTMLAudioElement).currentTime
    ).toBe(0);
    expect(play).toHaveBeenCalledTimes(1);
    expect(onPlayStateChange).toHaveBeenCalledWith(true);
  });
});
