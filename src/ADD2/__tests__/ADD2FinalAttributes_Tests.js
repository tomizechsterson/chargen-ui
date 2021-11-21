import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2FinalAttributes from "../ADD2FinalAttributes";

describe('Final Attributes Component', () => {
  it('Displays error message if Save is clicked too soon',() => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const { getByRole } = render(<ADD2FinalAttributes selectedChar={ testChar() } />);
    const saveButton = getByRole('button', { name: /Save/ });

    userEvent.click(saveButton);

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must roll for all attributes to save');
  });

  it('Allows rolling and saving final attributes', async () => {
    const onUpdateFn = jest.fn();
    function mockGateway() {
      return {
        getHWA: () => { return [99, 999, 99] },
        getHPGP: () => { return [99, 9999] },
        getFinalAttributes: () => { return [99, 99, 99, 99, 99, 99] }
      }
    }
    const { getByText, getByRole } =
      render(
        <ADD2FinalAttributes
          selectedChar={ testChar() }
          onUpdate={ onUpdateFn }
          gateway={ mockGateway() }
        />
      );
    const hwaButton = getByRole('button', { name: /Roll Height\/Weight\/Age/ });
    const hpgpButton = getByRole('button', { name: /Roll HP\/GP/ });
    const saveButton = getByRole('button', { name: /Save/ });

    userEvent.click(hwaButton);

    await waitFor(() => getByText(/Age: 99/));
    expect(getByText(/Age: 99/)).toBeInTheDocument();
    expect(getByText(/Height: 8'3"/)).toBeInTheDocument();
    expect(getByText(/Weight: 999/)).toBeInTheDocument();

    userEvent.click(hpgpButton);

    await waitFor(() => getByText(/HP: 99/));
    expect(getByText(/HP: 99/)).toBeInTheDocument();
    expect(getByText(/Funds: 9999/)).toBeInTheDocument();
    expect(getByText(/Movement Rate: 99/)).toBeInTheDocument();
    expect(getByText(/Paralyzation, Poison, Death Magic: 99/)).toBeInTheDocument();
    expect(getByText(/Rod, Staff, Wand: 99/)).toBeInTheDocument();
    expect(getByText(/Petrification, Polymorph: 99/)).toBeInTheDocument();
    expect(getByText(/Breath Weapon: 99/)).toBeInTheDocument();
    expect(getByText(/Spell: 99/)).toBeInTheDocument();

    userEvent.click(saveButton);

    expect(onUpdateFn).toBeCalledTimes(1);
    expect(onUpdateFn).toBeCalledWith(completedChar());
  });
});

const testChar = () => {
  return {
    id: 1,
    name: 'Test Character',
    completionStep: 5,
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
    alignment: 'Test Alignment',
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

const completedChar = () => {
  return {
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
    height: 99,
    weight: 999,
    age: 99,
    className: 'Test Class',
    alignment: 'Test Alignment',
    paralyze: 99,
    rod: 99,
    petrification: 99,
    breath: 99,
    spell: 99,
    hp: 99,
    moveRate: 99,
    funds: 9999
  };
};
