import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2StatRoll from "../ADD2StatRoll";

describe('ADD2StatRoll Component', () => {
  it('defaults to the Roll Once rule', () => {
    const { getByText } = render(<ADD2StatRoll />);

    expect(getByText(/Standard Stat Rolling. Roll once per stat and that's it./)).toBeInTheDocument();
  });

  it('can select the Roll Twice rule', () => {
    const { getByText, getByRole } = render(<ADD2StatRoll />);

    userEvent.selectOptions(getByRole('combobox'), 'Roll Twice');

    expect(getByText(/The higher of two rolls is selected for each ability score/)).toBeInTheDocument();
  });

  it('can select the Stat Assignment rule', () => {
    const { getByText, getByRole } = render(<ADD2StatRoll />);

    userEvent.selectOptions(getByRole('combobox'), 'Stat Assignment');

    expect(getByText(/Assign 6 rolls to stats/)).toBeInTheDocument();
  });

  it('can select the Double Stat Assignment rule', () => {
    const { getByText, getByRole } = render(<ADD2StatRoll />);

    userEvent.selectOptions(getByRole('combobox'), 'Double Stat Assignment');

    expect(getByText(/Roll 12 and assign 6 to stats/)).toBeInTheDocument();
  });

  it('can select the Roll 4 Dice rule', () => {
    const { getByText, getByRole } = render(<ADD2StatRoll />);

    userEvent.selectOptions(getByRole('combobox'), 'Roll 4 dice');

    expect(getByText(/Only the three highest rolls are added to the ability score/)).toBeInTheDocument();
  });

  it('can select the Add 7 Dice to 8 rule', () => {
    const { getByText, getByRole } = render(<ADD2StatRoll selectedChar={testChar}/>);

    userEvent.selectOptions(getByRole('combobox'), 'Add 7 Dice to 8');

    expect(getByText(/All stats start at 8, and 7 dice are added/)).toBeInTheDocument();
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
    chr: 0,
    race: 'none',
    gender: 'n',
    height: 0,
    weight: 0,
    age: 0,
    className: 'none',
    alignment: 'none',
    paralyze: 0,
    rod: 0,
    petrification: 0,
    breath: 0,
    spell: 0,
    hp: 0,
    moveRate: 0,
    funds: 0
  };
});
