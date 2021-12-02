import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2FinalAttributes from "../ADD2FinalAttributes";

describe('Final Attributes Component', () => {
  it('Displays error message if Save is clicked too soon',() => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    render(<ADD2FinalAttributes selectedChar={ testChar } />);

    userEvent.click(screen.getByRole('button', { name: /Save/ }));

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

    render(
      <ADD2FinalAttributes
        selectedChar={ testChar }
        onUpdate={ onUpdateFn }
        gateway={ mockGateway() }
      />
    );

    userEvent.click(screen.getByRole('button', { name: /Roll Height\/Weight\/Age/ }));

    await waitFor(() => screen.getByText(/Age: 99/));
    expect(screen.getByText(/Age: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Height: 8'3"/)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 999/)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /Roll HP\/GP/ }));

    await waitFor(() => screen.getByText(/HP: 99/));
    expect(screen.getByText(/HP: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Funds: 9999/)).toBeInTheDocument();
    expect(screen.getByText(/Movement Rate: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Paralyzation, Poison, Death Magic: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Rod, Staff, Wand: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Petrification, Polymorph: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Breath Weapon: 99/)).toBeInTheDocument();
    expect(screen.getByText(/Spell: 99/)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /Save/ }));

    expect(onUpdateFn).toBeCalledTimes(1);
    expect(onUpdateFn).toBeCalledWith(completedChar);
  });

  const testChar = {
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

  const completedChar = {
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
});
