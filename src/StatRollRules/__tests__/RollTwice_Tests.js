import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RollTwice from "../RollTwice";

describe('Roll Twice Component', () => {
  function mockGateway() {
    return {
      rollStats: () => {
        return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
          [3, 3, 3], [3, 3, 4], [3, 4, 4], [4, 4, 4], [4, 4, 5], [4, 5, 5]]
      }
    }
  }

  it('renders expected initial state', () => {
    render(<RollTwice />);

    expect(screen.getByRole('button', { name: /Roll Stats/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Stats/ })).toBeInTheDocument();
  });

  it('displays an error message if save is clicked before rolling', () => {
    render(<RollTwice />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    userEvent.click(screen.getByRole('button', { name: /Save Stats/ }));

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must roll stats to save');
  });

  it('displays the expected output after rolling stats', async () => {
    render(<RollTwice selectedChar={ testChar } gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));

    await waitFor(() => screen.getByText(/STR: 4/));
    expect(screen.getByTestId('strRoll')).toHaveTextContent('(3: 1 + 1 + 1), (4: 1 + 1 + 2)');
    expect(screen.getByText(/DEX: 6/));
    expect(screen.getByTestId('dexRoll')).toHaveTextContent('(5: 1 + 2 + 2), (6: 2 + 2 + 2)');
    expect(screen.getByText(/CON: 8/));
    expect(screen.getByTestId('conRoll')).toHaveTextContent('(7: 2 + 2 + 3), (8: 2 + 3 + 3)');
    expect(screen.getByText(/INT: 10/));
    expect(screen.getByTestId('intRoll')).toHaveTextContent('(9: 3 + 3 + 3), (10: 3 + 3 + 4)');
    expect(screen.getByText(/WIS: 12/));
    expect(screen.getByTestId('wisRoll')).toHaveTextContent('(11: 3 + 4 + 4), (12: 4 + 4 + 4)');
    expect(screen.getByText(/CHR: 14/));
    expect(screen.getByTestId('chrRoll')).toHaveTextContent('(13: 4 + 4 + 5), (14: 4 + 5 + 5)');
  });

  it('updates character as expected', async () => {
    const updateFn = jest.fn();
    render(<RollTwice selectedChar={ testChar } gateway={ mockGateway() } onUpdate={ updateFn } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));

    await waitFor(() => screen.getByText(/STR: 4/));
    userEvent.click(screen.getByRole('button', { name: /Save Stats/ }));

    await waitFor(() => expect(updateFn).toHaveBeenCalledTimes(1));
    expect(updateFn).toHaveBeenCalledWith(updatedChar);
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

  const updatedChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 2,
    str: 4,
    dex: 6,
    con: 8,
    int: 10,
    wis: 12,
    chr: 14,
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
