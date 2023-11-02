import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import CalendarApp from ".";
import { TimerProvider } from "../../contexts/PomodoroContext";
import { expect } from "vitest";


describe("Calendar", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimerProvider>
          <CalendarApp />
        </TimerProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays a heading with appropriate text", () => {
    const heading = screen.getByRole("userTitle");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe(`'s Calendar`);
  });

})

it("Displays a calendar", ()=>{
  const button1 = document.querySelector(".react-calendar__navigation__prev2-button")
  if (button1){
  expect(button1).toBeInTheDocument()
  } else{
    throw new Error("Element not found.")
  }
})