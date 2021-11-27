import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Assignment from '../Assignment';

describe('Assignment roll rule component', () => {
  function mockGateway() {
    return {
      rollStats: () => {
        return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]]
      }
    }
  }

  it('displays the expected initial state', () => {
    render(<Assignment double={ false }/>);

    expect(screen.getByRole('button', { name: /Roll Stats/ })).toBeInTheDocument();
    expect(screen.getByText(/Assign 6 rolls to stats/)).toBeInTheDocument();
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

  it('displays an alert if Save is clicked before all stats are assigned', () => {
    render(<Assignment />);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    userEvent.click(screen.getByRole('button', { name: /Save Stats/ }));

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('must assign all stats to save');
  });

  it('displays the expected output after rolling stats', async () => {
    render(<Assignment double={ false } gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));

    await waitFor(() => expect(screen.getByRole('button', { name: /3/ })).toBeInTheDocument());
    expect(screen.getByTestId('STR_roll')).toHaveTextContent('(1 + 1 + 1)');
    expect(screen.getByRole('button', { name: /4/ })).toBeInTheDocument();
    expect(screen.getByTestId('DEX_roll')).toHaveTextContent('(1 + 1 + 2)');
    expect(screen.getByRole('button', { name: /5/ })).toBeInTheDocument();
    expect(screen.getByTestId('CON_roll')).toHaveTextContent('(1 + 2 + 2)');
    expect(screen.getByRole('button', { name: /6/ })).toBeInTheDocument();
    expect(screen.getByTestId('INT_roll')).toHaveTextContent('(2 + 2 + 2)');
    expect(screen.getByRole('button', { name: /7/ })).toBeInTheDocument();
    expect(screen.getByTestId('WIS_roll')).toHaveTextContent('(2 + 2 + 3)');
    expect(screen.getByRole('button', { name: /8/ })).toBeInTheDocument();
    expect(screen.getByTestId('CHR_roll')).toHaveTextContent('(2 + 3 + 3)');
  });

  it('enables Assign button after selecting a stat and roll', async () => {
    render(<Assignment double={ false } gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => expect(screen.getByRole('button', { name: /Assign/ })).toBeDisabled());

    userEvent.click(screen.getByRole('button', { name: 'DEX' }));
    userEvent.click(screen.getByRole('button', { name: /3/ }));

    expect(screen.getByRole('button', { name: /Assign/ })).toBeEnabled();
  });

  it('enables Reset button and disables roll button after assigning a roll to a stat', async () => {
    render(<Assignment double={ false } gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'STR' })));

    userEvent.click(screen.getByRole('button', { name: /7/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));

    expect(screen.getByRole('button', { name: /Reset/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /7/ })).toBeDisabled();
  });

  it('resets stat assignments as expected', async () => {
    render(<Assignment double={ false } gateway={ mockGateway() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'STR' })));
    userEvent.click(screen.getByRole('button', { name: /8/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /8/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'DEX' }));
    userEvent.click(screen.getByRole('button', { name: /7/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /7/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'CON' }));
    userEvent.click(screen.getByRole('button', { name: /6/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /6/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'INT' }));
    userEvent.click(screen.getByRole('button', { name: /5/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /5/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'WIS' }));
    userEvent.click(screen.getByRole('button', { name: /4/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /4/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'CHR' }));
    userEvent.click(screen.getByRole('button', { name: /3/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /3/ })).toBeDisabled();

    userEvent.click(screen.getByRole('button', { name: /Reset/ }));

    expect(screen.getByRole('button', { name: /8/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /7/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /6/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /5/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /4/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /3/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /Reset/ })).toBeDisabled();
  });

  it('updates the character as expected when clicking Save Stats', async () => {
    const updateFn = jest.fn();
    render(<Assignment double={ false } selectedChar={ testChar } gateway={ mockGateway() } onUpdate={ updateFn } />);
    // noinspection DuplicatedCode
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'STR' })));
    userEvent.click(screen.getByRole('button', { name: /8/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'DEX' }));
    userEvent.click(screen.getByRole('button', { name: /7/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'CON' }));
    userEvent.click(screen.getByRole('button', { name: /6/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'INT' }));
    userEvent.click(screen.getByRole('button', { name: /5/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'WIS' }));
    userEvent.click(screen.getByRole('button', { name: /4/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    userEvent.click(screen.getByRole('button', { name: 'CHR' }));
    userEvent.click(screen.getByRole('button', { name: /3/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));

    userEvent.click(screen.getByRole('button', { name: /Save Stats/ }));

    expect(updateFn).toHaveBeenCalledTimes(1);
    expect(updateFn).toHaveBeenCalledWith(updatedChar);
  });

  const testChar = {
    id: 1,
    name: 'New Character',
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
    name: 'New Character',
    completionStep: 2,
    str: 8,
    dex: 7,
    con: 6,
    int: 5,
    wis: 4,
    chr: 3
  };
});
