import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

import { TimerProvider } from '../../contexts/PomodoroContext';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NotesPage from '.';

describe("NotesPage page", () => {

    beforeEach(() => {
        render(<BrowserRouter><TimerProvider><NotesPage /></TimerProvider></BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });


    it("Displays a heading with appropriate text", () => {
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBe("Notes");
    })

    it("Has an 'Add Notes' button with appropriate routing", async () => {
        const link = screen.getByText("Add a Note");
        expect(link).toBeInTheDocument();
        expect(location.pathname = "localhost:5173/notes")
        await userEvent.click(link);
        expect(location.pathname = "localhost:5173/notes/add")
    })

    it('Renders the NoteFilters component', () => {
        const noteFilters = screen.getByRole('note-filters');
        expect(noteFilters).toBeInTheDocument();
    });

    it('Displays notes in the note-holder', async () => {
        const sampleNotes = [
            {
                id: 1,
                user_id: 1,
                title: 'Sample Note 1',
                context: 'This is a sample note.',
                created_at: '2023-11-02T12:00:00Z',
                updated_at: '2023-11-02T12:00:00Z',
            },
        ];

        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => sampleNotes,
        });


        for (const note of sampleNotes) {
            await screen.findByText(note.title);
        }

        for (const note of sampleNotes) {
            expect(screen.getByText(note.title)).toBeInTheDocument();
        }
    });

})
