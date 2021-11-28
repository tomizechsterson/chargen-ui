import React from 'react';
import { render, within, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Add7Dice from "../Add7Dice";

describe('Add7Dice component', () => {
  function mockGateway() {
    return {
      rollStats: () => {
        return [[1], [2], [3], [4], [5], [6], [1]]
      }
    }
  }

  it('displays the expected initial state', () => {
    render(<Add7Dice />);

    expect(screen.getByRole('button', { name: /Roll Stats/ })).toBeInTheDocument();
    expect(screen.getByText(/All stats start at 8, and 7 dice are added/)).toBeInTheDocument();
    // noinspection DuplicatedCode
    expect(screen.getByText(/Selected Stat: , Selected Roll:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /STR/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /DEX/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /CON/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /INT/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /WIS/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /CHR/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Assign/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Reset/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Save Stats/ })).toBeInTheDocument();
  });

  it('displays an alert if Save Stats is clicked before rolling stats', () => {
    render(<Add7Dice />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    userEvent.click(screen.getByRole('button', { name: /Save Stats/ }));

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must roll stats and assign all to save');
  });

  it('displays an alert if Save Stats is clicked before assigning all rolls', async () => {
    render(<Add7Dice gateway={ mockGateway() } />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => expect(screen.getByText(/Selected Stat:/)).toBeInTheDocument());

    userEvent.click(screen.getByRole('button', { name: /Save Stats/ }));

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must assign all rolls to save');
  });

  it('displays the expected output after rolling stats', async () => {
    render(<Add7Dice gateway={ mockGateway() } />);

    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));

    await waitFor(() => expect(within(screen.getByTestId('add7Rolls')).getAllByRole('button')).toHaveLength(7));
    expect(within(screen.getByTestId('add7Rolls')).getAllByRole('button', { name: /1/ })).toHaveLength(2);
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /2/ })).toBeInTheDocument();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /3/ })).toBeInTheDocument();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /4/ })).toBeInTheDocument();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /5/ })).toBeInTheDocument();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /6/ })).toBeInTheDocument();
  });

  it('allows selecting and deselecting rolls and stats', async () => {
    render(<Add7Dice gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => expect(screen.getByText(/Selected Stat: , Selected Roll:/)).toBeInTheDocument());

    userEvent.click(screen.getByRole('button', { name: /INT/ }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /2/ }));

    expect(screen.getByText(/Selected Stat: INT, Selected Roll: 2/)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /INT/ }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /2/ }));

    expect(screen.getByText(/Selected Stat: , Selected Roll:/)).toBeInTheDocument()
  });

  it('enables Assign button after selecting a stat and roll', async () => {
    render(<Add7Dice gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => expect(screen.getByRole('button', { name: /Assign/ })).toBeDisabled());

    userEvent.click(screen.getByRole('button', { name: /WIS/ }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /3/ }));

    expect(screen.getByRole('button', { name: /Assign/ })).toBeEnabled();
  });

  it('enables Reset button and disables assigned roll button after assigning a roll to a stat', async () => {
    render(<Add7Dice gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'CHR' })));

    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /6/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));

    expect(screen.getByRole('button', { name: /Reset/ })).toBeEnabled();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /6/ })).toBeDisabled();
  });

  it('prevents a stat from exceeding 18 when assigning a roll and deselects offending roll', async () => {
    render(<Add7Dice selectedChar={ testChar } gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => expect(screen.getByText(/Selected Stat: , Selected Roll:/)).toBeInTheDocument());
    preventStatFromExceeding18('STR');
    preventStatFromExceeding18('DEX');
    preventStatFromExceeding18('CON');
    preventStatFromExceeding18('INT');
    preventStatFromExceeding18('WIS');
    preventStatFromExceeding18('CHR');
  });

  it('resets stat assignments as expected', async () => {
    render(<Add7Dice selectedChar={ testChar } gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'STR' })));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getAllByRole('button', { name: /1/ })[0]);
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(within(screen.getByTestId('add7Rolls')).getAllByRole('button', { name: /1/ })[0]).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'DEX' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /2/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /2/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'CON' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /3/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /3/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'INT' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /4/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /4/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'WIS' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /5/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /5/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'CHR' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /6/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /6/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'STR' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getAllByRole('button', { name: /1/ })[1]);
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(within(screen.getByTestId('add7Rolls')).getAllByRole('button', { name: /1/ })[1]).toBeDisabled();

    userEvent.click(screen.getByRole('button', { name: /Reset/ }));

    expect(within(screen.getByTestId('add7Rolls')).getAllByRole('button', { name: /1/ })[0]).toBeEnabled();
    expect(within(screen.getByTestId('add7Rolls')).getAllByRole('button', { name: /1/ })[1]).toBeEnabled();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /2/ })).toBeEnabled();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /3/ })).toBeEnabled();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /4/ })).toBeEnabled();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /5/ })).toBeEnabled();
    expect(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /6/ })).toBeEnabled();
  });

  it('updates the character as expected when clicking Save Stats', async () => {
    const updateFn = jest.fn();
    render(<Add7Dice selectedChar={ testChar } gateway={ mockGateway() } onUpdate={ updateFn }/>);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'CHR' })));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getAllByRole('button', { name: /1/ })[0]);
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'DEX' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /2/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'CON' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /3/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'INT' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /4/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'WIS' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /5/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'CHR' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /6/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'STR' }));
    userEvent.click(within(screen.getByTestId('add7Rolls')).getAllByRole('button', { name: /1/ })[1]);
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));

    userEvent.click(screen.getByRole('button', { name: /Save Stats/ }));

    expect(updateFn).toHaveBeenCalledTimes(1);
    expect(updateFn).toHaveBeenCalledWith(updatedChar);
  });

  const preventStatFromExceeding18 = (stat) => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const selectStatOnly = new RegExp(`Selected Stat: ${stat}, Selected Roll:`);
    const selectStatAnd6 = new RegExp(`Selected Stat: ${stat}, Selected Roll: 6`);
    const selectStatAnd5 = new RegExp(`Selected Stat: ${stat}, Selected Roll: 5`);
    userEvent.click(screen.getByRole('button', { name: `${stat}` }));
    expect(screen.getByText(selectStatOnly)).toBeInTheDocument();
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /6/ }));
    expect(screen.getByText(selectStatAnd6)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByText(selectStatOnly)).toBeInTheDocument();
    userEvent.click(within(screen.getByTestId('add7Rolls')).getByRole('button', { name: /5/ }));
    expect(screen.getByText(selectStatAnd5)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /Assign/ }));

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('Stat cannot exceed 18');
    expect(screen.getByText(selectStatOnly)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Reset/ }));
    alertMock.mockReset();
  };

  const testChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 1,
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    chr: 8
  };

  const updatedChar = {
    id: 1,
    name: 'Test Character',
    completionStep: 2,
    str: 9,
    dex: 10,
    con: 11,
    int: 12,
    wis: 13,
    chr: 15
  };
});
