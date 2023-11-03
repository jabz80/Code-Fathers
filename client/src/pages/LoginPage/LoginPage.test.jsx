import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LoginPage from '.';
import { TimerProvider } from '../../contexts/PomodoroContext';

describe('Login Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TimerProvider>
          <LoginPage />
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
    expect(heading.textContent).toBe('LOGIN');
  });

  it('Displays a username with appropriate text', () => {
    const elem = screen.getByRole('textbox', { name: /Username:/i });
    expect(elem).toBeInTheDocument();
  });
  it('Displays a Sign in button with appropriate text', () => {
    const elem = screen.getByRole('button', { name: /Sign in/i });
    expect(elem).toBeInTheDocument();
  });
  it('Displays a Register button with appropriate text', () => {
    const elem = screen.getByRole('button', { name: /Register/i });
    expect(elem).toBeInTheDocument();
  });
  it('Displays a username with appropriate text', () => {
    const elem = screen.getByPlaceholderText('Enter Password');
    expect(elem).toBeInTheDocument();
  });

  it('logins when correct credentials entered', () => {
    const userInput = screen.getByRole('textbox', { name: /Username:/i });
    userEvent.type(userInput, 'user');
    const passwordInput = screen.getByPlaceholderText('Enter Password');
    userEvent.type(passwordInput, 'pass');
    const signIn = screen.getByRole('button', { name: /Sign in/i });

    const fetchSpy = vi.spyOn(global, 'fetch');
    const fetchSpy2 = vi.spyOn(global, 'fetch');
    const mockResponse = [
      {
        token: 'asdfsaf-sdfafsa-sdfas',
      },
    ];

    const mockResolveValue = {
      ok: true,
      status: 200,
      json: () => new Promise((resolve) => resolve(mockResponse)),
    };

    fetchSpy.mockReturnValue(mockResolveValue);
    //expect(fetch).toHaveBeenCalledWith('http://localhost:3000/users/login');
    // const mockResponse2 = [
    //   {
    //     id: 1,
    //     name: 'Bob the builder',
    //   },
    // ];

    // const mockResolveValue2 = {
    //   ok: true,
    //   json: () => new Promise((resolve) => resolve(mockResponse2)),
    // };

    // fetchSpy.mockReturnValue(mockResolveValue2);

    fireEvent.click(signIn);
    expect(window.location.href).toEqual('http://localhost:3000/');
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
