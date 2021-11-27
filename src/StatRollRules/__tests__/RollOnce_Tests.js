import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RollOnce from '../RollOnce';

describe('Roll Once Component', () => {
  function mockGateway() {
    return {
      rollStats: () => { return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]] }
    }
  }

  it('renders expected initial state', () => {
    render(<RollOnce />);

    expect(screen.getByRole('button', { name: /Roll Stats/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Stats/ })).toBeInTheDocument();
  });

  it('displays an error message if save is clicked before rolling', () => {
    render(<RollOnce />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    userEvent.click(screen.getByRole('button', { name: /Save Stats/ }));

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must roll stats to save');
  });

  it('displays the expected output after rolling stats', async () => {
    render(<RollOnce selectedChar={ testChar } gateway={ mockGateway() }/>);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));

    await waitFor(() => screen.getByText(/STR: 3/));
    expect(screen.getByTestId('strRoll')).toHaveTextContent('(1 + 1 + 1)');
    expect(screen.getByText(/DEX: 4/));
    expect(screen.getByTestId('dexRoll')).toHaveTextContent('(1 + 1 + 2)');
    expect(screen.getByText(/CON: 5/));
    expect(screen.getByTestId('conRoll')).toHaveTextContent('(1 + 2 + 2)');
    expect(screen.getByText(/INT: 6/));
    expect(screen.getByTestId('intRoll')).toHaveTextContent('(2 + 2 + 2)');
    expect(screen.getByText(/WIS: 7/));
    expect(screen.getByTestId('wisRoll')).toHaveTextContent('(2 + 2 + 3)');
    expect(screen.getByText(/CHR: 8/));
    expect(screen.getByTestId('chrRoll')).toHaveTextContent('(2 + 3 + 3)');
  });

  it('updates character as expected', async () => {
    const updateFn = jest.fn();
    render(<RollOnce selectedChar={ testChar } gateway={ mockGateway() } onUpdate={ updateFn }/>);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));

    await waitFor(() => screen.getByText(/STR: 3/));
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
    chr: 0
  };

  const updatedChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 2,
    str: 3,
    dex: 4,
    con: 5,
    int: 6,
    wis: 7,
    chr: 8
  };
});
