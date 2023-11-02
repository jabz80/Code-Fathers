import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import RegisterPage from '.';
import { TimerProvider } from '../../contexts/PomodoroContext';

describe('Login Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimerProvider>
          <RegisterPage />
        </TimerProvider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('the heading has the appropriate text', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('REGISTER');
  });
  it('Displays Full Name with appropriate text', () => {
    const elem = screen.getByRole('textbox', { name: /Full Name:/i });
    expect(elem).toBeInTheDocument();
  });
  it('Displays a username with appropriate text', () => {
    const elem = screen.getByRole('textbox', { name: /Username:/i });
    expect(elem).toBeInTheDocument();
  });

  it('Displays a Submit button with appropriate text', () => {
    const elem = screen.getByRole('button', { name: /Submit/i });
    expect(elem).toBeInTheDocument();
  });
  it('Displays a password with appropriate text', () => {
    const elem = screen.getByPlaceholderText('Enter Password');
    expect(elem).toBeInTheDocument();
  });

  it('submits data when credentials entered and submit is clicked', () => {
    const userInput = screen.getByRole('textbox', { name: /Username:/i });
    userEvent.type(userInput, 'user');
    const passwordInput = screen.getByPlaceholderText('Enter Password');
    userEvent.type(passwordInput, 'pass');
    const submitBtn = screen.getByRole('button', { name: /Submit/i });

    const fetchSpy = vi.spyOn(global, 'fetch');

    const mockResponse = [
      {
        id: 33,
        username: 'Bob',
        password: 'HashedPassword',
        name: 'bob',
      },
    ];

    const mockResolveValue = {
      ok: true,
      status: 201,
      json: () => new Promise((resolve) => resolve(mockResponse)),
    };

    fetchSpy.mockReturnValue(mockResolveValue);

    fireEvent.click(submitBtn);

    fetchSpy.mockRestore();
  });

  //   it('fails to logins when incorrect credentials entered', () => {
  //     const userInput = screen.getByRole('textbox', { name: /Username:/i });
  //     userEvent.type(userInput, 'user');
  //     const passwordInput = screen.getByPlaceholderText('Enter Password');
  //     //userEvent.type(passwordInput, 'pass');
  //     const signIn = screen.getByRole('button', { name: /Sign in/i });

  //     //fireEvent.click(signIn);
  //     expect(window.location.href).toEqual('http://localhost:3000/login');
  //   });
  //   it("the heading has the appropriate amount of links", () => {
  //     const navigation = screen.getByRole("navigation");
  //     const list = screen.getByRole("unorderedList");
  //     expect(navigation).toBeInTheDocument();
  //     expect(navigation.children.length).toBe(2);
  //     expect(list).toBeInTheDocument();
  //     expect(list.children.length).toBe(5);
  //   });

  //   it("renders the Home link", () => {
  //     const homeLink = screen.getByRole("link", { name: /home/i });
  //     expect(homeLink).toBeInTheDocument();
  //     userEvent.click(homeLink);
  //     expect(window.location.href).toEqual("http://localhost:3000/");
  //   });
});
