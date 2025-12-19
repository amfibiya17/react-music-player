import { render, screen, fireEvent } from "@testing-library/react";
import Track from "./Track";
import type { TrackData } from "../../../types/track";

const mockTrack: TrackData = {
  title: "Test Track",
  file: "test.mp3",
};

describe("Track", () => {
  test("renders the track title", () => {
    render(<Track track={mockTrack} isSelected={false} onSelect={jest.fn()} />);

    expect(screen.getByTestId("track-button")).toHaveTextContent("Test Track");
  });

  test("applies selected styling when isSelected = true", () => {
    const { container } = render(
      <Track track={mockTrack} isSelected={true} onSelect={jest.fn()} />
    );

    expect(container.firstChild).toHaveClass("bg-primary");
    expect(container.firstChild).toHaveClass("text-primary-content");
  });

  test("applies hover styling when isSelected = false", () => {
    const { container } = render(
      <Track track={mockTrack} isSelected={false} onSelect={jest.fn()} />
    );

    expect(container.firstChild).toHaveClass("hover:bg-base-300");
  });

  test("calls onSelect when the track button is clicked", () => {
    const onSelect = jest.fn();

    render(<Track track={mockTrack} isSelected={false} onSelect={onSelect} />);

    fireEvent.click(screen.getByTestId("track-button"));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
