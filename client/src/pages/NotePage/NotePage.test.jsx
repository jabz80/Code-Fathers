import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { TimerProvider } from "../../contexts/PomodoroContext";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import NotePage from ".";

describe("NotePage component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimerProvider>
          <NotePage />
        </TimerProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays loading message while fetching note", async () => {
    const loadingMessage = await screen.findByText("loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it.skip("Displays note details when the note is loaded", async () => {
    const sampleNote = {
      id: 1,
      user_id: 1,
      title: "Sample Note 1",
      context: "This is a sample note.",
      created_at: "2023-11-02T12:00:00Z",
      updated_at: "2023-11-02T12:00:00Z",
    };

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => sampleNote,
    });

    await (location.pathname = "/notes/1");

    await screen.findByText(sampleNote.title);
    await screen.findByText(sampleNote.context);

    expect(screen.getByText(sampleNote.title)).toBeInTheDocument();
    expect(screen.getByText(sampleNote.context)).toBeInTheDocument();
  });

  it("Navigates back to notes page when 'Back' button is clicked", async () => {
    const backButton = await screen.findByText("Back");

    userEvent.click(backButton);

    // You might need to adjust the URL based on your expected behavior
    expect(window.location.pathname).toBe("/");
  });
});
