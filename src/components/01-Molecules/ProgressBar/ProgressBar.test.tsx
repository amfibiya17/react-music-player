import { render, screen, fireEvent } from "@testing-library/react";
import ProgressBar from "./ProgressBar";
import { progressBarText } from "../../../data/ui-text";

describe("ProgressBar", () => {
  test("renders slider with correct value, range and formatted times", () => {
    render(<ProgressBar currentTime={75} duration={200} onSeek={jest.fn()} />);

    const region = screen.getByRole("region", {
      name: progressBarText.timelineLabel,
    });
    expect(region).toBeInTheDocument();

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "200");
    expect(slider).toHaveAttribute("value", "75");
    expect(slider).not.toBeDisabled();
    expect(screen.getByText("1:15")).toBeInTheDocument();
    expect(screen.getByText("3:20")).toBeInTheDocument();
  });

  test("clamps currentTime to duration when currentTime is greater than duration", () => {
    render(<ProgressBar currentTime={500} duration={120} onSeek={jest.fn()} />);

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("value", "120");

    const times = screen.getAllByText("2:00");
    expect(times).toHaveLength(2);
  });

  test("disables slider and shows 0:00 when duration is not valid", () => {
    render(<ProgressBar currentTime={50} duration={0} onSeek={jest.fn()} />);

    const slider = screen.getByRole("slider");
    expect(slider).toBeDisabled();
    expect(slider).toHaveAttribute("max", "0");
    expect(slider).toHaveAttribute("value", "0");
    expect(screen.getAllByText("0:00")).toHaveLength(2);
  });

  test("calls onSeek with the selected time when slider changes", () => {
    const handleSeek = jest.fn();

    render(<ProgressBar currentTime={0} duration={300} onSeek={handleSeek} />);

    const slider = screen.getByRole("slider");

    fireEvent.change(slider, { target: { value: "120" } });

    expect(handleSeek).toHaveBeenCalledTimes(1);
    expect(handleSeek).toHaveBeenCalledWith(120);
  });
});
