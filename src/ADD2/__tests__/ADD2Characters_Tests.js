import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2Characters from '../ADD2Characters';

describe('ADD2Characters', () => {
  it('Adds a character to the list', async () => {
    render(<ADD2Characters useTestData={true} testData={[]} />);
    userEvent.type(screen.getByRole('textbox'), 'test');
    expect(screen.getByRole('textbox')).toHaveValue('test');

    userEvent.click(screen.getByText('Create'));

    expect(screen.getAllByRole('row')[1]).toHaveTextContent('test');
  });
});
