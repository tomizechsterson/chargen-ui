import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectorHome from "../SelectorHome";

describe('SelectorHome tests', () => {
  it('renders the default text', () => {
    render(<SelectorHome />);

    expect(screen.getByText(/To get started, select a data store below, and select a game above./)).toBeInTheDocument();
  });
});
