import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { TimerProvider } from '../../contexts/PomodoroContext';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NotePage from '.';

describe("NotePage component", () => {

    beforeEach(() => {
        render(<BrowserRouter><TimerProvider><NotePage /></TimerProvider></BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });

    it("Displays loading message while fetching note", async () => {


        const loadingMessage = await screen.findByText("loading...");
        expect(loadingMessage).toBeInTheDocument();
    });

    it("Displays note details when the note is loaded", async () => {
        const sampleNote = {
            id: 1,
            title: 'Sample Note 1',
            context: 'This is a sample note.',
        };
    
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => sampleNote,
        });
    
        render(
            <MemoryRouter initialEntries={['/notes/1']}>
                <TimerProvider>
                    <NotePage />
                </TimerProvider>
            </MemoryRouter>
        );
    
        // Wait for the note to load asynchronously
        await screen.findByText((content, element) => {
            return content.includes(sampleNote.title) && element.tagName.toLowerCase() === 'h1';
        });
        await screen.findByText((content, element) => {
            return content.includes(sampleNote.context) && element.tagName.toLowerCase() === 'em';
        });
    
        // Assert that the title and context are displayed
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
