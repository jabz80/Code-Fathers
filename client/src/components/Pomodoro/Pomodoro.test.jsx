import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Pomodoro from '.';
import { TimerProvider } from '../../contexts/PomodoroContext';
import { expect } from 'vitest';

describe('Pomodoro', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimerProvider>
          <Pomodoro />
        </TimerProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays a heading with appropriate text', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Pomodoro Timer');
  });

  it('Renders the Start button on the page', () => {
    const startButton = screen.getByRole('startButton');
    expect(startButton).toBeInTheDocument();
    expect(startButton.textContent).toBe('Start');
  });

  it('Renders the button Pause when Start is clicked', async () => {
    const startButton = screen.getByRole('startButton');
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    expect(startButton.textContent).toBe('Pause');
  });

  it('Renders the Reset button on the page', () => {
    const resetButton = screen.getByRole('resetButton');
    expect(resetButton).toBeInTheDocument();
    expect(resetButton.textContent).toBe('Reset');
  });

  it('Reset button resets Start button back to Start when Timer is running and then Reset clicked', async () => {
    const startButton = screen.getByRole('startButton');
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    expect(startButton.textContent).toBe('Pause');
    const resetButton = screen.getByRole('resetButton');
    expect(resetButton).toBeInTheDocument();
    await userEvent.click(resetButton);
    expect(startButton.textContent).toBe('Start');
  });

  it('Renders the Settings button on the page', () => {
    const settingsButton = screen.getByRole('settingsButton');
    expect(settingsButton).toBeInTheDocument();
    expect(settingsButton.textContent).toBe('Settings');
  });

  it('Displays a paragraph with appropriate text', () => {
    const revision = screen.getByRole('revision');
    expect(revision).toBeInTheDocument();
    expect(revision.textContent).toBe('Time to Revise!');
  });

  it('Renders the correct sliders when Settings is clicked', async () => {
    expect(screen.queryByRole('revisionTime')).not.toBeInTheDocument();
    expect(screen.queryByRole('breakTime')).not.toBeInTheDocument();
    const settingsButton = screen.getByRole('settingsButton');
    expect(settingsButton).toBeInTheDocument();
    await userEvent.click(settingsButton);
    expect(screen.getByRole('revisionTime')).toBeInTheDocument();
    expect(screen.getByRole('breakTime')).toBeInTheDocument();
  });
});
