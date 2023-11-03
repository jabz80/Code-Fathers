import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TimerProvider } from "../../contexts/PomodoroContext";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);


import HomePage from ".";

describe("Homepage component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimerProvider>
          <HomePage />
        </TimerProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });


  it("Displays a message with appropriate text", () => {
    const message = screen.getByRole("message");
    expect(message).toBeInTheDocument();
    expect(message.textContent).toBe(
      "Our all-in-one studying calendar, notes, and timer app"
    );

  });
});
