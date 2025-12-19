import { renderHook, act } from "@testing-library/react";
import { usePlayerController } from "./usePlayerController";
import type { TrackData } from "../../../../types/track";

const mockTracks: TrackData[] = [
  { title: "Track 1", file: "track1.mp3" },
  { title: "Track 2", file: "track2.mp3" },
  { title: "Track 3", file: "track3.mp3" },
];

describe("usePlayerController", () => {
  test("initialises with first track selected, not playing, full volume, repeat off", () => {
    const { result } = renderHook(() => usePlayerController(mockTracks));

    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.selectedTrack).toEqual(mockTracks[0]);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.volume).toBe(1);
    expect(result.current.isRepeatEnabled).toBe(false);
  });

  test("handleSelectTrack updates selectedIndex and selectedTrack", () => {
    const { result } = renderHook(() => usePlayerController(mockTracks));

    act(() => {
      result.current.handleSelectTrack(1);
    });

    expect(result.current.selectedIndex).toBe(1);
    expect(result.current.selectedTrack).toEqual(mockTracks[1]);
  });

  test("handleSelectTrack does nothing if selecting the same index", () => {
    const { result } = renderHook(() => usePlayerController(mockTracks));

    act(() => {
      result.current.handleSelectTrack(0);
    });

    expect(result.current.selectedIndex).toBe(0);
  });

  test("handleNextTrack cycles to the next track and wraps around", () => {
    const { result } = renderHook(() => usePlayerController(mockTracks));

    act(() => {
      result.current.handleNextTrack();
    });
    expect(result.current.selectedIndex).toBe(1);

    act(() => {
      result.current.handleNextTrack();
    });
    expect(result.current.selectedIndex).toBe(2);

    act(() => {
      result.current.handleNextTrack();
    });
    expect(result.current.selectedIndex).toBe(0);
  });

  test("handlePreviousTrack cycles to the previous track and wraps around", () => {
    const { result } = renderHook(() => usePlayerController(mockTracks));

    act(() => {
      result.current.handlePreviousTrack();
    });

    expect(result.current.selectedIndex).toBe(mockTracks.length - 1);
    expect(result.current.selectedTrack).toEqual(
      mockTracks[mockTracks.length - 1]
    );
  });

  test("handleTogglePlayPause does nothing when there is no selectedTrack", () => {
    const { result } = renderHook(() => usePlayerController([]));

    expect(result.current.selectedTrack).toBeNull();
    expect(result.current.isPlaying).toBe(false);

    act(() => {
      result.current.handleTogglePlayPause();
    });

    expect(result.current.isPlaying).toBe(false);
  });

  test("handleTogglePlayPause toggles isPlaying when a track exists", () => {
    const { result } = renderHook(() => usePlayerController(mockTracks));

    act(() => {
      result.current.handleTogglePlayPause();
    });
    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.handleTogglePlayPause();
    });
    expect(result.current.isPlaying).toBe(false);
  });

  test("handleToggleRepeat toggles isRepeatEnabled", () => {
    const { result } = renderHook(() => usePlayerController(mockTracks));

    act(() => {
      result.current.handleToggleRepeat();
    });
    expect(result.current.isRepeatEnabled).toBe(true);

    act(() => {
      result.current.handleToggleRepeat();
    });
    expect(result.current.isRepeatEnabled).toBe(false);
  });

  test("handleChangeVolume clamps volume between 0 and 1", () => {
    const { result } = renderHook(() => usePlayerController(mockTracks));

    act(() => {
      result.current.handleChangeVolume(2);
    });
    expect(result.current.volume).toBe(1);

    act(() => {
      result.current.handleChangeVolume(-5);
    });
    expect(result.current.volume).toBe(0);

    act(() => {
      result.current.handleChangeVolume(0.3);
    });
    expect(result.current.volume).toBe(0.3);
  });

  test("handlePlayStateChange sets isPlaying based on argument", () => {
    const { result } = renderHook(() => usePlayerController(mockTracks));

    act(() => {
      result.current.handlePlayStateChange(true);
    });
    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.handlePlayStateChange(false);
    });
    expect(result.current.isPlaying).toBe(false);
  });
});
