import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import HomePage from '.'

describe("Homepage component", () => {

    beforeEach(() => {
        render(<BrowserRouter><HomePage /></BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });

    it("Displays a heading with appropriate text", () => {
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBe("Welcome to the Crammer Revision App");
    })
})   

