import React from 'react';
import { getByRole, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2Characters from '../ADD2Characters';

describe('ADD2Characters', () => {
  it('does not display Delete button before a character is selected', () => {
    const { queryByRole } = render(<ADD2Characters useTestData={ true } testData={ getTestData() } />);

    expect(queryByRole('button', { name: /Delete/ })).not.toBeInTheDocument();
  });

  it('Adds a character to the table via button and enter key', async () => {
    const { getByRole, queryAllByRole } = render(<ADD2Characters useTestData={ true } testData={ [] } />);
    expect(queryAllByRole('row').length).toBe(0);
    userEvent.type(getByRole('textbox'), 'test');
    expect(getByRole('textbox')).toHaveValue('test');

    userEvent.click(getByRole('button', { name: /Create/ }));

    expect(queryAllByRole('row').length).toBe(2); // This counts the header row
    expect(getByRole('row', { name: /test/})).toBeInTheDocument();

    userEvent.type(getByRole('textbox'), 'newTest{enter}');

    expect(queryAllByRole('row').length).toBe(3); // This counts the header row
    expect(getByRole('row', { name: /newTest/})).toBeInTheDocument();
  });

  it('displays delete button after a character is selected', () => {
    const { getByRole } = render(<ADD2Characters useTestData={ true } testData={ getTestData() } />);

    userEvent.click(getByRole('row', { name: /test1/ }));

    expect(getByRole('button', { name: /Delete/ })).toBeInTheDocument();
  });

  it('allows deleting a character', () => {
    const { getByRole, queryAllByRole } = render(<ADD2Characters useTestData={ true } testData={ getTestData() } />);
    window.confirm = jest.fn(() => true);
    expect(queryAllByRole('row')).toHaveLength(4);

    userEvent.click(getByRole('row', { name: /test1/ }));
    userEvent.click(getByRole('button', { name: /Delete/ }));

    expect(queryAllByRole('row')).toHaveLength(3);
  });

  it('can cancel character deletion', () => {
    const { getByRole, queryAllByRole } = render(<ADD2Characters useTestData={ true } testData={ getTestData() } />);
    window.confirm = jest.fn(() => false);
    expect(queryAllByRole('row')).toHaveLength(4);

    userEvent.click(getByRole('row', { name: /test1/ }));
    userEvent.click(getByRole('button', { name: /Delete/ }));

    expect(queryAllByRole('row')).toHaveLength(4);
  });

  const getTestData = () => {
    return [
      { id: 1, name: 'test1', str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0, completionStep: 1 },
      { id: 2, name: 'test2', str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0, completionStep: 1 },
      { id: 3, name: 'test3', str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0, completionStep: 1 }
    ];
  }
});
