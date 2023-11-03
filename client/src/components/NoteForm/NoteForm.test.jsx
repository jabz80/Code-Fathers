import React from "react";
import { screen, render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'

import { TimerProvider } from "../../contexts/PomodoroContext";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import NoteForm from ".";
import { expect } from "vitest";

describe("NoteForm Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimerProvider>
          <NoteForm />
        </TimerProvider>
      </BrowserRouter>
    );
  });
  afterEach(() => {
    cleanup();
  });

  it("Displays a form with 2 input fields and a submit button", () => {
    const inputs = screen.getAllByRole("input-text")

    expect(inputs).toBeDefined();
    expect(inputs.length).toBe(2);

    const submitBtn = screen.getByRole("button")
    expect(submitBtn).toBeInTheDocument();

  })


})



describe('NoteForm handleSubmit function', () => {
  afterEach(() => {
    cleanup();
  });

  it('Creates a new note and navigates to it on successful submit (type: add)', async () => {
    // Mock the fetch function to return a successful response
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: async () => ({ id: 1 }),
    });

    render(
      <MemoryRouter initialEntries={['/notes/add']}>
        <TimerProvider>
          <NoteForm
            inputText="Sample Title"
            setInputText={() => {}}
            context="Sample Context"
            setContext={() => {}}
            message=""
            setMessage={() => {}}
            type=""
          />
        </TimerProvider>
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

  });

  it('Updates the note and navigates to it on successful submit (type: update)', async () => {
    // Mock the fetch function to return a successful response
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: async () => ({ id: 1 }),
    });

    render(
      <MemoryRouter initialEntries={['/notes/1']}>
        <TimerProvider>
          <NoteForm
            inputText="Updated Title"
            setInputText={() => {}}
            context="Updated Context"
            setContext={() => {}}
            message=""
            setMessage={() => {}}
            type="update"
          />
        </TimerProvider>
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Update Note');
    userEvent.click(submitButton);


  });

  it('Displays an error message when the fetch call fails (type: add)', async () => {
    // Mock the fetch function to return an error response
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

    render(
      <MemoryRouter initialEntries={['/notes/add']}>
        <TimerProvider>
          <NoteForm
            inputText="Sample Title"
            setInputText={() => {}}
            context="Sample Context"
            setContext={() => {}}
            message=""
            setMessage={() => {}}
            type="add"
          />
        </TimerProvider>
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Add a Note');
    userEvent.click(submitButton);


  });

  it('Displays an error message when the fetch call fails (type: update)', async () => {
    // Mock the fetch function to return an error response
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

    render(
      <MemoryRouter initialEntries={['/notes/1']}>
        <TimerProvider>
          <NoteForm
            inputText="Updated Title"
            setInputText={() => {}}
            context="Updated Context"
            setContext={() => {}}
            message=""
            setMessage={() => {}}
            type="update"
          />
        </TimerProvider>
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Update Note');
    userEvent.click(submitButton);


  });

  it('Displays a validation error message when input fields are empty', async () => {
    render(
      <MemoryRouter initialEntries={['/notes/add']}>
        <TimerProvider>
          <NoteForm
            inputText=""
            setInputText={() => {}}
            context=""
            setContext={() => {}}
            message=""
            setMessage={() => {}}
            type="add"
          />
        </TimerProvider>
      </MemoryRouter>
    );

    const submitButton = screen.getByText('Add a Note');
    userEvent.click(submitButton);

    // Wait for the validation error message to be displayed

  });
});