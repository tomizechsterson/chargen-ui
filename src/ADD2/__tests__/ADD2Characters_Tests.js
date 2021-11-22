import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2Characters from '../ADD2Characters';

describe('ADD2Characters', () => {
  it('displays message if no characters have been created', () => {
    const { getByText } = render(<ADD2Characters useTestData={ true } testData={ [] } />);

    expect(getByText(/No characters have been created. Enter a name in the field above and click Create to begin/)).toBeInTheDocument();
  });

  it('Adds a character to the table', async () => {
    const { getByRole, queryAllByRole } = render(<ADD2Characters useTestData={ true } testData={ [] } />);
    expect(queryAllByRole('row').length).toBe(0);
    userEvent.type(getByRole('textbox'), 'test');
    expect(getByRole('textbox')).toHaveValue('test');

    userEvent.click(getByRole('button', { name: /Create/ }));

    expect(queryAllByRole('row').length).toBe(2); // This appears to count the header row
    expect(getByRole('row', { name: /test/})).toBeInTheDocument();
  });
});
