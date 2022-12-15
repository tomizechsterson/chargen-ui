import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RollFour from "../RollFour";
import MockGatewayADD2 from "../../DataAccess/mockGatewayADD2";

describe('Roll Four Component', () => {
  it('renders expected initial state', () => {
    render(<RollFour selectedChar={ testChar } />);

    expect(screen.getByRole('button', { name: /Roll Stats/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Stats/ })).toBeInTheDocument();
  });

  it('displays an error message if save is clicked before rolling', () => {
    render(<RollFour selectedChar={ testChar } />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    userEvent.click(screen.getByRole('button', { name: /Save Stats/ }));

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must roll stats to save');
  });

  it('displays the expected output after rolling stats', async () => {
    render(<RollFour selectedChar={ testChar } gateway={ new MockGatewayADD2() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));

    await waitFor(() => expect(screen.getByText(/STR: 3/)).toBeInTheDocument());
    expect(screen.getByTestId('strRoll')).toHaveTextContent('(1 + 1 + 1 + 1)');
    expect(screen.getByText(/DEX: 4/)).toBeInTheDocument();
    expect(screen.getByTestId('dexRoll')).toHaveTextContent('(2 + 1 + 1 + 1)');
    expect(screen.getByText(/CON: 5/)).toBeInTheDocument();
    expect(screen.getByTestId('conRoll')).toHaveTextContent('(3 + 1 + 1 + 1)');
    expect(screen.getByText(/INT: 6/)).toBeInTheDocument();
    expect(screen.getByTestId('intRoll')).toHaveTextContent('(4 + 1 + 1 + 1)');
    expect(screen.getByText(/WIS: 7/)).toBeInTheDocument();
    expect(screen.getByTestId('wisRoll')).toHaveTextContent('(5 + 1 + 1 + 1)');
    expect(screen.getByText(/CHR: 8/)).toBeInTheDocument();
    expect(screen.getByTestId('chrRoll')).toHaveTextContent('(6 + 1 + 1 + 1)');
  });

  it('updates character as expected', async () => {
    const updateFn = jest.fn();
    render(<RollFour selectedChar={ testChar } gateway={ new MockGatewayADD2() } onUpdate={ updateFn } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));

    await waitFor(() => expect(screen.getByText(/DEX: 4/)).toBeInTheDocument());
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
