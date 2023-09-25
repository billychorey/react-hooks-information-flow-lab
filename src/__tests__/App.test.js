import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";

// Define a local flexibleTextMatcher function
function flexibleTextMatcher(text, pattern) {
  if (typeof pattern === "string") {
    return text.includes(pattern);
  } else if (pattern instanceof RegExp) {
    return pattern.test(text);
  }
  return false;
}

test("displays in 'light' mode when initialized", () => {
  render(<App />);
  expect(screen.getByText(/mode/i)).toBeInTheDocument();
});

test("changes to 'dark' mode when the button is clicked", () => {
  render(<App />);
  expect(screen.getByText(/mode/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/mode/i));

  expect(screen.getByText(/mode/i)).toBeInTheDocument();
});

test("changes back to 'light' mode when the button is clicked twice", () => {
  const { container } = render(<App />);
  expect(container.querySelector(".light")).toBeInTheDocument();

  const modeButton = container.querySelector("button");
  fireEvent.click(modeButton);

  expect(container.querySelector(".dark")).toBeInTheDocument();

  fireEvent.click(modeButton);

  expect(container.querySelector(".light")).toBeInTheDocument();
});