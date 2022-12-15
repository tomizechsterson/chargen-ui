import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ADD2CharacterCreation from "../ADD2CharacterCreation";

describe('ADD2 Character Creation component', () => {
  it('displays the stat roller for step 1', () => {
    render(<ADD2CharacterCreation selectedChar={{ completionStep: 1 }} />);

    expect(screen.getByText(/Stat rolling rule:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Roll Stats/})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Stats/})).toBeInTheDocument();
  });

  it('displays race and gender selection for step 2', () => {
    render(<ADD2CharacterCreation selectedChar={{ completionStep: 2 }} />);

    expect(screen.getByText(/Select Race:/)).toBeInTheDocument();
    expect(screen.getByText(/Select Gender:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/})).toBeInTheDocument();
  });

  it('displays class selection for step 3', () => {
    render(<ADD2CharacterCreation selectedChar={{ completionStep: 3 }} />);

    expect(screen.getByText(/Select Class:/)).toBeInTheDocument();
  });

  it('displays alignment selection for step 4', () => {
    render(<ADD2CharacterCreation selectedChar={{ completionStep: 4 }} />);

    expect(screen.getByText(/Select Alignment:/)).toBeInTheDocument();
  });

  it('displays the final attributes buttons for step 5', () => {
    render(<ADD2CharacterCreation selectedChar={{ completionStep: 5 }} />);

    expect(screen.getByText(/Saving Throws/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Roll Height\/Weight\/Age/})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Roll HP\/GP/})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/})).toBeInTheDocument();
  });
});
