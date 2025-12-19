import { render, screen, fireEvent } from "@testing-library/react";
import VolumeControl from "./VolumeControl";
import { volumeControlText } from "../../../data/ui-text";

describe("VolumeControl", () => {
  test("renders a range input with the correct initial value", () => {
    render(<VolumeControl volume={0.5} onChange={jest.fn()} />);

    const slider = screen.getByRole("slider", {
      name: volumeControlText.label,
    });

    expect(slider).toHaveAttribute("value", "50");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
    expect(slider).toHaveAttribute("step", "1");
  });

  test("calls onChange with a normalised value when the slider changes", () => {
    const handleChange = jest.fn();

    render(<VolumeControl volume={0} onChange={handleChange} />);

    const slider = screen.getByRole("slider", {
      name: volumeControlText.label,
    });

    fireEvent.change(slider, { target: { value: "75" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(0.75);
  });

  test("clamps values below 0 and above 100 before normalising", () => {
    const handleChange = jest.fn();

    render(<VolumeControl volume={0.5} onChange={handleChange} />);

    const slider = screen.getByRole("slider", {
      name: volumeControlText.label,
    });

    fireEvent.change(slider, { target: { value: "200" } });
    fireEvent.change(slider, { target: { value: "-10" } });

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenNthCalledWith(1, 1);
    expect(handleChange).toHaveBeenNthCalledWith(2, 0);
  });

  test("wraps input in a section with the correct aria-label", () => {
    render(<VolumeControl volume={0.3} onChange={jest.fn()} />);

    const region = screen.getByRole("region", {
      name: volumeControlText.label,
    });

    expect(region).toBeInTheDocument();
  });
});
