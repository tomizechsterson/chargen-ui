import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MainApp from "../MainApp";

describe('Top-level MainApp component', () => {
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

      userEvent.selectOptions(screen.getByRole('combobox'), 'Local Storage');

      expect(screen.getByText('.NET Core').selected).not.toBeTruthy();
      expect(screen.getByText('Local Storage').selected).toBeTruthy();
      expect(localStorage.getItem('serviceSelection')).toBe('local');
    });
  });
});
