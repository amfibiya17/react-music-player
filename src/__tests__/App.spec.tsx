import { render, screen, within } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("renders the main application area and heading", () => {
    render(<App />);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    const heading = within(main).getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
