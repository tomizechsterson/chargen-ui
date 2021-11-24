import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectorHome from "../SelectorHome";

describe('SelectorHome tests', () => {
  it('renders the default text', () => {
    const { getByText } = render(<SelectorHome />);

    expect(getByText(/To get started, select a game above./)).toBeInTheDocument();
  });
});
