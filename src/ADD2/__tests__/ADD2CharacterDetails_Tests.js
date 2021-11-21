import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ADD2CharacterDetails from "../ADD2CharacterDetails";

describe('ADD2 Character Details Component', () => {
  it('Displays details when character is completed', () => {
    const { queryByText } = render(<ADD2CharacterDetails selectedChar={ completedChar() } />);

    expect(queryByText(/Character Details/)).toBeInTheDocument();
    expect(queryByText(/Test Completed Character/)).toBeInTheDocument();
    expect(queryByText(/Character Creation/)).not.toBeInTheDocument();
    expect(queryByText(/No character selected/)).not.toBeInTheDocument();
  });

  it('displays Character Creation when character is in progress', () => {
    const { queryByText } = render(<ADD2CharacterDetails selectedChar={ inProgressChar() } />);

    expect(queryByText(/Character Details/)).not.toBeInTheDocument();
    expect(queryByText(/Character Creation/)).toBeInTheDocument();
    expect(queryByText(/New Character/)).toBeInTheDocument();
    expect(queryByText(/No character selected/)).not.toBeInTheDocument();
  });

  it('displays "No character selected" when there is no selected character', () => {
    const { queryByText } = render(<ADD2CharacterDetails />);

    expect(queryByText(/Character Details/)).not.toBeInTheDocument();
    expect(queryByText(/Character Creation/)).not.toBeInTheDocument();
    expect(queryByText(/No character selected/)).toBeInTheDocument();
  });
});

const completedChar = () => {
  return {
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
};

const inProgressChar = () => {
  return {
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
};
