import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
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