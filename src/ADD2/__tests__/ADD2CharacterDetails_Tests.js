import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ADD2CharacterDetails from "../ADD2CharacterDetails";

describe('ADD2 Character Details Component', () => {
  it('Displays details when character is completed', () => {
    render(<ADD2CharacterDetails selectedChar={ completedChar } />);

    expect(screen.queryByText(/Character Details/)).toBeInTheDocument();
    expect(screen.queryByText(/Test Completed Character/)).toBeInTheDocument();
    expect(screen.queryByText(/Character Creation/)).not.toBeInTheDocument();
    expect(screen.queryByText(/No character selected/)).not.toBeInTheDocument();
  });

  it('displays Character Creation when character is in progress', () => {
    render(<ADD2CharacterDetails selectedChar={ inProgressChar } />);

    expect(screen.queryByText(/Character Details/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Character Creation/)).toBeInTheDocument();
    expect(screen.queryByText(/New Character/)).toBeInTheDocument();
    expect(screen.queryByText(/No character selected/)).not.toBeInTheDocument();
  });

  it('displays "No character selected" when there is no selected character', () => {
    render(<ADD2CharacterDetails />);

    expect(screen.queryByText(/Character Details/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Character Creation/)).not.toBeInTheDocument();
    expect(screen.queryByText(/No character selected/)).toBeInTheDocument();
  });

  const completedChar = {
    id: 1,
    name: 'Test Completed Character',
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

  const inProgressChar = {
    id: 1,
    name: 'New Character',
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
