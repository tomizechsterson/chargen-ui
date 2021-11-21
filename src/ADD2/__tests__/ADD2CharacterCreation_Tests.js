import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ADD2CharacterCreation from "../ADD2CharacterCreation";

describe('ADD2 Character Creation component', () => {
  it('displays the stat roller for step 1', () => {
    const { getByText, getByRole } = render(<ADD2CharacterCreation selectedChar={{ completionStep: 1 }} />);

    expect(getByText(/Stat rolling rule:/)).toBeInTheDocument();
    expect(getByRole('button', { name: /Roll Stats/})).toBeInTheDocument();
    expect(getByRole('button', { name: /Save Stats/})).toBeInTheDocument();
  });

  it('displays race and gender selection for step 2', () => {
    const { getByText, getByRole } = render(<ADD2CharacterCreation selectedChar={{ completionStep: 2 }} />);

    expect(getByText(/Select Race:/)).toBeInTheDocument();
    expect(getByText(/Select Gender:/)).toBeInTheDocument();
    expect(getByRole('button', { name: /Save/})).toBeInTheDocument();
  });

  it('displays class selection for step 3', () => {
    const { getByText } = render(<ADD2CharacterCreation selectedChar={{ completionStep: 3 }} />);

    expect(getByText(/Select Class:/)).toBeInTheDocument();
  });

  it('displays alignment selection for step 4', () => {
    const { getByText } = render(<ADD2CharacterCreation selectedChar={{ completionStep: 4 }} />);

    expect(getByText(/Select Alignment:/)).toBeInTheDocument();
  });

  it('displays the final attributes buttons for step 5', () => {
    const { getByText, getByRole } = render(<ADD2CharacterCreation selectedChar={{ completionStep: 5 }} />);

    expect(getByText(/Saving Throws/)).toBeInTheDocument();
    expect(getByRole('button', { name: /Roll Height\/Weight\/Age/})).toBeInTheDocument();
    expect(getByRole('button', { name: /Roll HP\/GP/})).toBeInTheDocument();
    expect(getByRole('button', { name: /Save/})).toBeInTheDocument();
  });
});
