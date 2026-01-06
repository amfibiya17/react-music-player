import { renderHook, act } from "@testing-library/react";
import { usePlaybackTime } from "./usePlaybackTime";

describe("usePlaybackTime", () => {
  test("initialises with 0 currentTime, 0 duration, and null seekTime", () => {
    const { result } = renderHook(() => usePlaybackTime());

    expect(result.current.currentTime).toBe(0);
    expect(result.current.duration).toBe(0);
    expect(result.current.seekTime).toBeNull();
  });

  test("handleTimeChange updates currentTime and duration", () => {
    const { result } = renderHook(() => usePlaybackTime());

    act(() => {
      result.current.handleTimeChange(12.5, 180);
    });

    expect(result.current.currentTime).toBe(12.5);
    expect(result.current.duration).toBe(180);
  });

  test("handleSeek updates seekTime and currentTime", () => {
    const { result } = renderHook(() => usePlaybackTime());

    act(() => {
      result.current.handleSeek(42);
    });

    expect(result.current.seekTime).toBe(42);
    expect(result.current.currentTime).toBe(42);
  });

  test("handleSeek does not change duration", () => {
    const { result } = renderHook(() => usePlaybackTime());

    act(() => {
      result.current.handleTimeChange(10, 200);
    });

    act(() => {
      result.current.handleSeek(50);
    });

    expect(result.current.duration).toBe(200);
  });
});
