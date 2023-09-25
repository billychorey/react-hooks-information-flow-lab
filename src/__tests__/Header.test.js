import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";

// Define a local flexibleTextMatcher function
function flexibleTextMatcher(text, pattern) {
  if (typeof pattern === "string") {
    return text.includes(pattern);
  } else if (pattern instanceof RegExp) {
    return pattern.test(text);
  }
  return false;
}

test("displays the toggle button", () => {
  render(<Header />);
  expect(screen.queryByText((content, element) => flexibleTextMatcher(content, "Mode"))).toBeInTheDocument();
});

test("calls the onDarkModeClick callback prop when the button is clicked", () => {
  const onDarkModeClick = jest.fn();
  render(<Header onDarkModeClick={onDarkModeClick} />);

  fireEvent.click(screen.queryByText((content, element) => flexibleTextMatcher(content, "Mode")));
  expect(onDarkModeClick).toHaveBeenCalled();
});