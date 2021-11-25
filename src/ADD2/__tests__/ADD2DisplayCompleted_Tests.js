import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ADD2DisplayCompleted from '../ADD2DisplayCompleted';

describe('When a character is completed', () => {
  it('displays the expected info', () => {
    render(<ADD2DisplayCompleted selectedChar={ testChar } />);

    expect(screen.getByText('Test Character')).toBeInTheDocument();
    expect(screen.getByText(/Race: Test Race/)).toBeInTheDocument();
    expect(screen.getByText(/Gender: M/)).toBeInTheDocument();
    expect(screen.getByText(/Class: Test Class/)).toBeInTheDocument();
    expect(screen.getByText(/Alignment: Test Alignment/)).toBeInTheDocument();
    expect(screen.getByText(/Age: 999/)).toBeInTheDocument();
    expect(screen.getByText(/Height: 5'7"/)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 999/)).toBeInTheDocument();
    expect(screen.getByText(/STR: 99/)).toBeInTheDocument();
    expect(screen.getByText(/DEX: 99/)).toBeInTheDocument();
    expect(screen.getByText(/CON: 99/)).toBeInTheDocument();
    expect(screen.getByText(/INT: 99/)).toBeInTheDocument();
    expect(screen.getByText(/WIS: 99/)).toBeInTheDocument();
    expect(screen.getByText(/CHR: 99/)).toBeInTheDocument();
    expect(screen.getByText(/HP: 999/)).toBeInTheDocument();
    expect(screen.getByText(/Movement Rate: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Funds: 9999 gp/)).toBeInTheDocument();
    expect(screen.getByText(/Paralyzation, Poison, Death Magic: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Rod, Staff, Wand: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Petrification, Polymorph: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Breath Weapon: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Spell: 99/)).toBeInTheDocument();
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
