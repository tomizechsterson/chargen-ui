import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2ClassSelection from "../ADD2ClassSelection";

describe('ADD2ClassSelection Component', () => {
  it('Allows selection of a class', () => {
    const onUpdateFn = jest.fn();
    const { getByRole } = render(<ADD2ClassSelection selectedChar={ testChar } onUpdate={ onUpdateFn } />);

    userEvent.selectOptions(getByRole('combobox'), 'Test Class');

    expect(onUpdateFn).toBeCalledTimes(1);
    expect(onUpdateFn).toBeCalledWith(updatedChar);
  });

  const testChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 3,
    str: 99,
    dex: 99,
    con: 99,
    int: 99,
    wis: 99,
    chr: 99,
    race: 'Test Race',
    gender: 'M',
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
    funds: 0,
    availableClasses: [
      'Test Class'
    ]
  };

  const updatedChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 4,
    str: 99,
    dex: 99,
    con: 99,
    int: 99,
    wis: 99,
    chr: 99,
    race: 'Test Race',
    gender: 'M',
    height: 0,
    weight: 0,
    age: 0,
    className: 'Test Class',
    alignment: 'none',
    paralyze: 0,
    rod: 0,
    petrification: 0,
    breath: 0,
    spell: 0,
    hp: 0,
    moveRate: 0,
    funds: 0,
    availableClasses: [
      'Test Class'
    ]
  };
});
