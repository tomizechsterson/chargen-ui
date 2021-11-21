import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2RaceSelection from "../ADD2RaceSelection";

describe('Race Selection Component', () => {
  it('Displays error message if Save is clicked before race is selected', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const { getByText } = render(<ADD2RaceSelection selectedChar={ testChar() } />);
    const saveButton = getByText('Save');

    userEvent.click(saveButton);

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
    const { getByText, getByRole } = render(<ADD2RaceSelection selectedChar={ testChar() } gateway={ mockGateway() } />);
    const raceDropDown = getByRole('combobox');
    const saveButton = getByText('Save');

    userEvent.selectOptions(raceDropDown, 'Test Race');
    userEvent.click(saveButton);

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must select a gender to save');
  });

  it('Allows saving after race and gender are selected', async () => {
    function mockGateway() {
      return {
        getAdjustments: () => { return [{ 'key': 'str', 'value': 1 }, { 'key': 'dex', 'value': -1 }] }
      }
    }
    const onUpdateFn = jest.fn();
    const { getByText, getByRole, getByLabelText } =
      render(
        <ADD2RaceSelection
          selectedChar={ testChar() }
          onUpdate={ onUpdateFn }
          gateway={ mockGateway() }
        />
      );
    const raceDropDown = getByRole('combobox');
    const genderRadioButton = getByText('Male');
    const saveButton = getByText('Save');

    userEvent.selectOptions(raceDropDown, 'Test Race');
    await waitFor(() => getByText(/Test Race/));
    userEvent.click(genderRadioButton);
    await waitFor(() => getByText(/Male/));
    expect(getByLabelText(/Male/)).toBeChecked();
    userEvent.click(saveButton);

    expect(onUpdateFn).toBeCalledTimes(1);
    expect(onUpdateFn).toBeCalledWith(updatedChar());
  });
});

const testChar = () => {
  return {
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
};

const updatedChar = () => {
  return {
    id: 1,
    name: 'Test Character',
    completionStep: 3,
    str: 11,
    dex: 9,
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
};
