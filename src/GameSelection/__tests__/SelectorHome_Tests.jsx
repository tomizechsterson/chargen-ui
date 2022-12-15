import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectorHome from "../SelectorHome";

describe('SelectorHome tests', () => {
  it('renders the default state', () => {
    render(<SelectorHome />);

    expect(screen.getByText(/To get started, select a data store below, and select a game above./)).toBeInTheDocument();
    expect(screen.getByText('.NET Core').selected).not.toBeTruthy();
    expect(screen.getByText('Local Storage').selected).not.toBeTruthy();
  });

  it('renders with Local Storage selected', () => {
    render(<SelectorHome selectedService={ 'local' } onSelectService={ jest.fn() } />);

    expect(screen.getByText('.NET Core').selected).not.toBeTruthy();
    expect(screen.getByText('Local Storage').selected).toBeTruthy();
  });
});
