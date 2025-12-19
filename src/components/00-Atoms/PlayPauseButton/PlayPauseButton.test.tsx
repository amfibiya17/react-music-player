import { render, screen, fireEvent } from "@testing-library/react";
import PlayPauseButton from "./PlayPauseButton";
import { playPauseButtonText } from "../../../data/ui-text";

describe("PlayPauseButton", () => {
  test("renders play state with correct aria attributes when isPlaying is false", () => {
    render(<PlayPauseButton isPlaying={false} onToggle={jest.fn()} />);

    const button = screen.getByRole("button", {
      name: playPauseButtonText.playLabel,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).not.toBeDisabled();
  });

  test("renders pause state with correct aria attributes when isPlaying is true", () => {
    render(<PlayPauseButton isPlaying={true} onToggle={jest.fn()} />);

    const button = screen.getByRole("button", {
      name: playPauseButtonText.pauseLabel,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).not.toBeDisabled();
  });

  test("calls onToggle when clicked if not disabled", () => {
    const onToggle = jest.fn();

    render(<PlayPauseButton isPlaying={false} onToggle={onToggle} />);

    const button = screen.getByRole("button", {
      name: playPauseButtonText.playLabel,
    });

    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  test("does not call onToggle when disabled", () => {
    const onToggle = jest.fn();

    render(
      <PlayPauseButton isPlaying={false} onToggle={onToggle} disabled={true} />
    );

    const button = screen.getByRole("button", {
      name: playPauseButtonText.playLabel,
    });

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(onToggle).not.toHaveBeenCalled();
  });
});
