import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2RaceSelection from "../ADD2RaceSelection";

describe('Race Selection Component', () => {
  it('Displays error message if Save is clicked before race is selected', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    render(<ADD2RaceSelection selectedChar={ testChar } />);

    userEvent.click(screen.getByRole('button', { name: /Save/ }));

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must select a race to save');
  });

  it('Displays error message if Save is clicked before gender is selected', () => {
    function mockGateway() {
      return {
        getAdjustments: () => { return [{ 'key': 'str', 'value': 1 }, { 'key': 'dex', 'value': -1 }] }
      }
    }
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    render(<ADD2RaceSelection selectedChar={ testChar } gateway={ mockGateway() } />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'Test Race');
    userEvent.click(screen.getByRole('button', { name: /Save/ }));

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must select a gender to save');
  });

  it('Allows saving after race and gender are selected', async () => {
    function mockGateway() {
      return {
        getAdjustments: () => { return [{ 'key': 'str', 'value': 99 }, { 'key': 'dex', 'value': -99 }] }
      }
    }
    const onUpdateFn = jest.fn();
    render(
      <ADD2RaceSelection
        selectedChar={ testChar }
        onUpdate={ onUpdateFn }
        gateway={ mockGateway() }
      />
    );

    userEvent.selectOptions(screen.getByRole('combobox'), 'Test Race');
    await waitFor(() => screen.getByText(/Test Race/));
    expect(screen.getByText(/( 99 )/)).toBeInTheDocument();
    expect(screen.getByText(/( -99 )/)).toBeInTheDocument();
    userEvent.click(screen.getByRole('radio', { name: /Male/ }));
    await waitFor(() => screen.getByText(/Male/));
    expect(screen.getByLabelText(/Male/)).toBeChecked();
    userEvent.click(screen.getByRole('button', { name: /Save/ }));

    expect(onUpdateFn).toBeCalledTimes(1);
    expect(onUpdateFn).toBeCalledWith(updatedChar);
  });

  const testChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 2,
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    chr: 10,
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
    funds: 0,
    availableRaces: [
      'Test Race'
    ]
  };

  const updatedChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 3,
    str: 109,
    dex: -89,
    con: 10,
    int: 10,
    wis: 10,
    chr: 10,
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
    availableRaces: [
      'Test Race'
    ]
  };
});
