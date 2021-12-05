import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainApp from "../MainApp";

describe('Top-level App component', () => {
  it('renders without exploding', () => {
    render(<MainApp />);
    expect(screen.getByText('Character Generator')).toBeInTheDocument();
  });
});
