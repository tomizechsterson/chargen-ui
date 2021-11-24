import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2CharacterTable from "../ADD2CharacterTable";

describe('ADD2 Character Table component', () => {
  it('renders a message if no characters have been created', () => {
    const { getByText } = render(<ADD2CharacterTable characters={ [] } />);

    expect(getByText(/No characters have been created. Enter a name in the field above and click Create to begin/)).toBeInTheDocument();
  });

  it('displays the correct completion status', () => {
    const { getByRole } = render(<ADD2CharacterTable characters={ testData() } />);

    const incompleteChar = getByRole('row', { name: /Test Step 1/ });
    const completeChar = getByRole('row', { name: /Test Completed/ });

    expect(incompleteChar).toHaveTextContent(/No/);
    expect(completeChar).toHaveTextContent(/Yes/);
  });

  it('selects the expected character when clicking a row', () => {
    const selectFn = jest.fn();
    const { getByRole } = render(<ADD2CharacterTable characters={ testData() } onSelect={ selectFn } />);

    userEvent.click(getByRole('row', { name: /Test Step 1/ }));

    expect(selectFn).toHaveBeenCalledTimes(1);
    expect(selectFn).toHaveBeenCalledWith(1);
  });
});

const testData = () => {
  return [
    { id: 1, name: 'Test Step 1', completionStep: 1 },
    { id: 2, name: 'Test Completed', race: 'Test Race', className: 'Test Class', completionStep: 6 }
  ];
};
