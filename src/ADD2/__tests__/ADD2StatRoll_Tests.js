import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2StatRoll from "../ADD2StatRoll";

describe('ADD2StatRoll Component', () => {
  it('defaults to the Roll Once rule', () => {
    render(<ADD2StatRoll />);

    expect(screen.getByText(/Standard Stat Rolling. Roll once per stat and that's it./)).toBeInTheDocument();
  });

  it('can select the Roll Twice rule', () => {
    render(<ADD2StatRoll />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Roll Twice');

    expect(screen.getByText(/The higher of two rolls is selected for each ability score/)).toBeInTheDocument();
  });

  it('can select the Stat Assignment rule', () => {
    render(<ADD2StatRoll />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Stat Assignment');

    expect(screen.getByText(/Assign 6 rolls to stats/)).toBeInTheDocument();
  });

  it('can select the Double Stat Assignment rule', () => {
    render(<ADD2StatRoll />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Double Stat Assignment');

    expect(screen.getByText(/Roll 12 and assign 6 to stats/)).toBeInTheDocument();
  });

  it('can select the Roll 4 Dice rule', () => {
    render(<ADD2StatRoll />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Roll 4 dice');

    expect(screen.getByText(/Only the three highest rolls are added to the ability score/)).toBeInTheDocument();
  });

  it('can select the Add 7 Dice to 8 rule', () => {
    render(<ADD2StatRoll selectedChar={testChar}/>);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Add 7 Dice to 8');

    expect(screen.getByText(/All stats start at 8, and 7 dice are added/)).toBeInTheDocument();
  });

  const testChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 1,
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    chr: 0
  };
});
