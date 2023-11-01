import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import Footer from ".";

describe("Footer component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("the footer has the appropriate text", () => {
    const footer = screen.getByRole("footer");
    expect(footer).toBeInTheDocument();
    expect(footer.textContent).toMatch(/\u00A9 2023 Code Fathers/);
  });
});
