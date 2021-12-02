import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2CharacterTable from "../ADD2CharacterTable";

describe('ADD2 Character Table component', () => {
  it('renders a message if no characters have been created', () => {
    render(<ADD2CharacterTable characters={ [] } />);

    expect(screen.getByText(/No characters have been created. Enter a name in the field above and click Create to begin/)).toBeInTheDocument();
  });

  it('displays the correct completion status', () => {
    render(<ADD2CharacterTable characters={ testData } />);

    expect(screen.getByRole('row', { name: /Test Incomplete/ })).toHaveTextContent(/No/);
    expect(screen.getByRole('row', { name: /Test Completed/ })).toHaveTextContent(/Yes/);
  });

  it('selects the expected character when clicking a row', () => {
    const selectFn = jest.fn();
    render(<ADD2CharacterTable characters={ testData } onSelect={ selectFn } />);

    userEvent.click(screen.getByRole('row', { name: /Test Incomplete/ }));

    expect(selectFn).toHaveBeenCalledTimes(1);
    expect(selectFn).toHaveBeenCalledWith(1);
  });

  const testData = [
    { id: 1, name: 'Test Incomplete', completionStep: 1 },
    { id: 2, name: 'Test Completed', race: 'Test Race', className: 'Test Class', completionStep: 6 }
  ];
});
