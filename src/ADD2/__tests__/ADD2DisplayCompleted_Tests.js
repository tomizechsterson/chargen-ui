import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ADD2DisplayCompleted from '../ADD2DisplayCompleted';

describe('When a character is completed', () => {
  it('displays the expected info', () => {
    const { getByText } = render(<ADD2DisplayCompleted selectedChar={ testChar } />);

    expect(getByText('Test Character')).toBeInTheDocument();
    expect(getByText(/Race: Test Race/)).toBeInTheDocument();
    expect(getByText(/Gender: M/)).toBeInTheDocument();
    expect(getByText(/Class: Test Class/)).toBeInTheDocument();
    expect(getByText(/Alignment: Test Alignment/)).toBeInTheDocument();
    expect(getByText(/Age: 999/)).toBeInTheDocument();
    expect(getByText(/Height: 5'7"/)).toBeInTheDocument();
    expect(getByText(/Weight: 999/)).toBeInTheDocument();
    expect(getByText(/STR: 99/)).toBeInTheDocument();
    expect(getByText(/DEX: 99/)).toBeInTheDocument();
    expect(getByText(/CON: 99/)).toBeInTheDocument();
    expect(getByText(/INT: 99/)).toBeInTheDocument();
    expect(getByText(/WIS: 99/)).toBeInTheDocument();
    expect(getByText(/CHR: 99/)).toBeInTheDocument();
    expect(getByText(/HP: 999/)).toBeInTheDocument();
    expect(getByText(/Movement Rate: 99/)).toBeInTheDocument();
    expect(getByText(/Funds: 9999 gp/)).toBeInTheDocument();
    expect(getByText(/Paralyzation, Poison, Death Magic: 99/)).toBeInTheDocument();
    expect(getByText(/Rod, Staff, Wand: 99/)).toBeInTheDocument();
    expect(getByText(/Petrification, Polymorph: 99/)).toBeInTheDocument();
    expect(getByText(/Breath Weapon: 99/)).toBeInTheDocument();
    expect(getByText(/Spell: 99/)).toBeInTheDocument();
  });

  const testChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 6,
    str: 99,
    dex: 99,
    con: 99,
    int: 99,
    wis: 99,
    chr: 99,
    race: 'Test Race',
    gender: 'M',
    height: 67,
    weight: 999,
    age: 999,
    className: 'Test Class',
    alignment: 'Test Alignment',
    paralyze: 99,
    rod: 99,
    petrification: 99,
    breath: 99,
    spell: 99,
    hp: 999,
    moveRate: 99,
    funds: 9999
  };
});
