import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainApp from "../MainApp";

describe('Top-level App component', () => {
  it('renders without exploding', () => {
    render(<MainApp />);
    expect(screen.getByText('Character Generator')).toBeInTheDocument();
    expect(screen.getByText('.NET Core').selected).not.toBeTruthy();
    expect(screen.getByText('Local Storage').selected).not.toBeTruthy();
  });

  describe('service selection dropdown with netcore in local storage', () => {
    it('renders with .NET Core selected', () => {
      localStorage.setItem('serviceSelection', 'netcore');

      render(<MainApp />);

      expect(screen.getByText('.NET Core').selected).toBeTruthy();
      expect(screen.getByText('Local Storage').selected).not.toBeTruthy();
    });
  });
});
