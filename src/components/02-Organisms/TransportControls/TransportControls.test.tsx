import { render, screen, fireEvent } from "@testing-library/react";
import TransportControls, { TransportControlsProps } from "./TransportControls";
import { transportControlsText } from "../../../data/ui-text";

jest.mock("../../00-Atoms/PlayPauseButton/PlayPauseButton", () => {
  return {
    __esModule: true,
    default: ({
      isPlaying,
      onToggle,
    }: {
      isPlaying: boolean;
      onToggle: () => void;
    }) => (
      <button
        type="button"
        data-testid="play-pause-button"
        aria-pressed={isPlaying}
        onClick={onToggle}
      >
        Play/Pause
      </button>
    ),
  };
});

const renderTransportControls = (
  overrideProps: Partial<TransportControlsProps> = {}
) => {
  const props: TransportControlsProps = {
    isPlaying: false,
    isRepeatEnabled: false,
    onTogglePlay: jest.fn(),
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    onToggleRepeat: jest.fn(),
    ...overrideProps,
  };

  render(<TransportControls {...props} />);

  return props;
};

describe("TransportControls", () => {
  test("renders previous, play/pause, next and repeat buttons with correct labels when repeat is off", () => {
    renderTransportControls({ isRepeatEnabled: false });

    expect(
      screen.getByRole("button", { name: transportControlsText.previousLabel })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: transportControlsText.nextLabel })
    ).toBeInTheDocument();

    expect(screen.getByTestId("play-pause-button")).toBeInTheDocument();

    const repeatButton = screen.getByRole("button", {
      name: transportControlsText.repeatOffLabel,
    });

    expect(repeatButton).toBeInTheDocument();
    expect(repeatButton).toHaveAttribute("aria-pressed", "false");
  });

  test("calls the correct handlers when buttons are clicked", () => {
    const props = renderTransportControls();

    fireEvent.click(
      screen.getByRole("button", { name: transportControlsText.previousLabel })
    );
    expect(props.onPrevious).toHaveBeenCalledTimes(1);

    fireEvent.click(
      screen.getByRole("button", { name: transportControlsText.nextLabel })
    );
    expect(props.onNext).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId("play-pause-button"));
    expect(props.onTogglePlay).toHaveBeenCalledTimes(1);

    const repeatButton = screen.getByRole("button", {
      name: transportControlsText.repeatOffLabel,
    });
    fireEvent.click(repeatButton);
    expect(props.onToggleRepeat).toHaveBeenCalledTimes(1);
  });

  test("shows repeat-on label and aria-pressed=true when repeat is enabled", () => {
    renderTransportControls({ isRepeatEnabled: true });

    const repeatButton = screen.getByRole("button", {
      name: transportControlsText.repeatOnLabel,
    });

    expect(repeatButton).toBeInTheDocument();
    expect(repeatButton).toHaveAttribute("aria-pressed", "true");
  });
});
