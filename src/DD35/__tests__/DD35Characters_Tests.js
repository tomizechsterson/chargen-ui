import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DD35Characters from "../DD35Characters";

describe('DD35Characters component', () => {
  it('renders expected initial state with no characters', () => {
    render(<DD35Characters useService={ false } localSeedData={ [] } />);

    expect(screen.getByRole('button', { name: /Create/ }));
    expect(screen.getByText('No characters')).toBeInTheDocument();
  });

  it('Adds a character to the table via button and enter key', () => {
    render(<DD35Characters useService={ false } localSeedData={ [] } />);
    expect(screen.queryAllByRole('row').length).toBe(0);
    userEvent.type(screen.getByRole('textbox'), 'test character');
    expect(screen.getByRole('textbox')).toHaveValue('test character');

    userEvent.click(screen.getByRole('button', { name: /Create/ }));

    expect(screen.queryAllByRole('row').length).toBe(2); // This counts the header row
    expect(screen.getByRole('row', { name: /test character/ })).toBeInTheDocument();

    userEvent.type(screen.getByRole('textbox'), 'new test{enter}');

    expect(screen.queryAllByRole('row').length).toBe(3);
    expect(screen.getByRole('row', { name: /new test/ })).toBeInTheDocument();
  });

  it('prevents adding a new character if only spaces or blank with button and enter key', () => {
    render(<DD35Characters useService={ false } localSeedData={ [] } />);
    expect(screen.queryAllByRole('row').length).toBe(0);

    userEvent.click(screen.getByRole('button', { name: /Create/ }));

    expect(screen.queryAllByRole('row').length).toBe(0);

    userEvent.type(screen.getByRole('textbox'), '    ');
    expect(screen.getByRole('textbox')).toHaveValue('    ');

    userEvent.click(screen.getByRole('button', { name: /Create/ }));

    expect(screen.queryAllByRole('row').length).toBe(0);
    expect(screen.getByRole('textbox')).toHaveValue('');

    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(screen.queryAllByRole('row').length).toBe(0);

    userEvent.type(screen.getByRole('textbox'), '    {enter}');

    expect(screen.queryAllByRole('row').length).toBe(0);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('prevents adding a character with a duplicate name', () => {
    render(<DD35Characters useService={ false } localSeedData={ [] } />);
    expect(screen.queryAllByRole('row').length).toBe(0);

    userEvent.type(screen.getByRole('textbox'), 'test{enter}');
    expect(screen.getByRole('row', { name: /test/ })).toBeInTheDocument();
    expect(screen.queryAllByRole('row').length).toBe(2);

    userEvent.type(screen.getByRole('textbox'), 'test');
    userEvent.click(screen.getByRole('button', { name: /Create/ }));

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.queryAllByRole('row').length).toBe(2);
  });

  it('allows deleting a character', () => {
    render(<DD35Characters useService={ false } localSeedData={ getTestData() } />);
    window.confirm = jest.fn(() => true);
    expect(screen.queryByRole('row', { name: /Test Character/ })).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /Another Character/ })).toBeInTheDocument();

    userEvent.click(within(screen.getByRole('row', { name: /Test Character/ })).getByRole('button', { name: /Delete/ }));

    expect(screen.queryByRole('row', { name: /Test Character/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /Another Character/ })).toBeInTheDocument();
  });

  it('can cancel deleting a character', () => {
    render(<DD35Characters useService={ false } localSeedData={ getTestData() } />);
    window.confirm = jest.fn(() => false);
    expect(screen.queryByRole('row', { name: /Test Character/ })).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /Another Character/ })).toBeInTheDocument();

    userEvent.click(within(screen.getByRole('row', { name: /Test Character/ })).getByRole('button', { name: /Delete/ }));

    expect(screen.queryByRole('row', { name: /Test Character/ })).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /Another Character/ })).toBeInTheDocument();
  });

  it('can navigate to and from a character to edit', () => {
    render(<DD35Characters useService={ false } localSeedData={ getTestData() } />);

    userEvent.click(within(screen.getByRole('row', { name: /Test Character/ })).getByRole('button', { name: /Edit/ }));

    expect(screen.queryByText(/Test Character/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Close/ })).toBeInTheDocument();
    expect(screen.queryByRole('row')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /Close/ }));

    expect(screen.queryAllByRole('row').length).toBe(3);
  });

  const getTestData = () => {
    return [
      { id: 1, name: "Test Character" },
      { id: 2, name: "Another Character" }
    ];
  }
});
