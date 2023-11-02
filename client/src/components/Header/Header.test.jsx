import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TimerProvider } from "../../contexts/PomodoroContext";
import userEvent from "@testing-library/user-event";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import Header from ".";

describe("Header component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimerProvider>
          <Header />
        </TimerProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("the heading has the appropriate amount of links", () => {
    const navigation = screen.getByRole("navigation");
    const list = screen.getByRole("unorderedList");
    expect(navigation).toBeInTheDocument();
    expect(navigation.children.length).toBe(2);
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(5);
  });

  it("renders the Home link", () => {
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(window.location.href).toEqual("http://localhost:3000/");
  });
});
