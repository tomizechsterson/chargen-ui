import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DD35CharacterCreate from "../DD35CharacterCreate";

describe('DD35CharacterCreate component', () => {
  it('renders expected initial state', () => {
    render(<DD35CharacterCreate selectedChar={ testChar } />);

    expect(screen.getByText(/test char/)).toBeInTheDocument();
  });

  const testChar = {
    id: 1,
    name: 'test char'
  };
});
