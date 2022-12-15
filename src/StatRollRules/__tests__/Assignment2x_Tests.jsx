import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Assignment from '../Assignment';
import MockGatewayADD2 from "../../DataAccess/mockGatewayADD2";

describe('Assignment component for Double Stat Assignment rule', () => {
  it('displays the expected initial state', () => {
    render(<Assignment double={ true }/>);

    expect(screen.getByRole('button', { name: /Roll Stats/ })).toBeInTheDocument();
    expect(screen.getByText(/Roll 12 and assign 6 to stats/)).toBeInTheDocument();
  });

  it('displays the expected output after rolling stats', async () => {
    render(<Assignment double={ true } gateway={ new MockGatewayADD2() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));

    await waitFor(() => expect(screen.getByRole('button', { name: /^3$/ })).toBeInTheDocument());
    expect(screen.getByTestId('STR_roll1')).toHaveTextContent('(1 + 1 + 1)');
    expect(screen.getByRole('button', { name: /^4$/ })).toBeInTheDocument();
    expect(screen.getByTestId('STR_roll2')).toHaveTextContent('(1 + 1 + 2)');
    expect(screen.getByRole('button', { name: /5/ })).toBeInTheDocument();
    expect(screen.getByTestId('DEX_roll1')).toHaveTextContent('(1 + 2 + 2)');
    expect(screen.getByRole('button', { name: /6/ })).toBeInTheDocument();
    expect(screen.getByTestId('DEX_roll2')).toHaveTextContent('(2 + 2 + 2)');
    expect(screen.getByRole('button', { name: /7/ })).toBeInTheDocument();
    expect(screen.getByTestId('CON_roll1')).toHaveTextContent('(2 + 2 + 3)');
    expect(screen.getByRole('button', { name: /8/ })).toBeInTheDocument();
    expect(screen.getByTestId('CON_roll2')).toHaveTextContent('(2 + 3 + 3)');
    expect(screen.getByRole('button', { name: /9/ })).toBeInTheDocument();
    expect(screen.getByTestId('INT_roll1')).toHaveTextContent('(3 + 3 + 3)');
    expect(screen.getByRole('button', { name: /10/ })).toBeInTheDocument();
    expect(screen.getByTestId('INT_roll2')).toHaveTextContent('(3 + 3 + 4)');
    expect(screen.getByRole('button', { name: /11/ })).toBeInTheDocument();
    expect(screen.getByTestId('WIS_roll1')).toHaveTextContent('(3 + 4 + 4)');
    expect(screen.getByRole('button', { name: /12/ })).toBeInTheDocument();
    expect(screen.getByTestId('WIS_roll2')).toHaveTextContent('(4 + 4 + 4)');
    expect(screen.getByRole('button', { name: /13/ })).toBeInTheDocument();
    expect(screen.getByTestId('CHR_roll1')).toHaveTextContent('(4 + 4 + 5)');
    expect(screen.getByRole('button', { name: /14/ })).toBeInTheDocument();
    expect(screen.getByTestId('CHR_roll2')).toHaveTextContent('(4 + 5 + 5)');
  });

  it('allows selecting and deselecting rolls and stats', async () => {
    render(<Assignment double={ true } gateway={ new MockGatewayADD2() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => expect(screen.getByText(/Selected Stat: , Selected Roll:/)).toBeInTheDocument());

    userEvent.click(screen.getByRole('button', { name: /DEX/ }));
    userEvent.click(screen.getByRole('button', { name: /^3$/ }));

    expect(screen.getByText(/Selected Stat: DEX, Selected Roll: 3/)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /DEX/ }));
    userEvent.click(screen.getByRole('button', { name: /^3$/ }));

    expect(screen.getByText(/Selected Stat: , Selected Roll:/)).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: /STR/ }));
    userEvent.click(screen.getByRole('button', { name: /^4$/ }));

    expect(screen.getByText(/Selected Stat: STR, Selected Roll: 4/)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /STR/ }));
    userEvent.click(screen.getByRole('button', { name: /^4$/ }));

    expect(screen.getByText(/Selected Stat: , Selected Roll:/)).toBeInTheDocument()
  });

  it('enables Assign button after selecting a stat and roll', async () => {
    render(<Assignment double={ true } gateway={ new MockGatewayADD2() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => expect(screen.getByRole('button', { name: /Assign/ })).toBeDisabled());

    userEvent.click(screen.getByRole('button', { name: 'STR' }));
    expect(screen.getByRole('button', { name: /Assign/ })).toBeDisabled()
    userEvent.click(screen.getByRole('button', { name: /14/ }));

    expect(screen.getByRole('button', { name: /Assign/ })).toBeEnabled();
  });

  it('enables Reset button and disables assigned roll button after assigning a roll to a stat', async () => {
    render(<Assignment double={ true } gateway={ new MockGatewayADD2() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'CHR' })));

    userEvent.click(screen.getByRole('button', { name: /12/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));

    expect(screen.getByRole('button', { name: /Reset/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /12/ })).toBeDisabled();
  });

  it('resets stat assignments as expected', async () => {
    render(<Assignment double={ true } gateway={ new MockGatewayADD2() } />);
    userEvent.click(screen.getByRole('button', { name: /Roll Stats/ }));
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: 'STR' })));
    userEvent.click(screen.getByRole('button', { name: /14/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /14/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'DEX' }));
    userEvent.click(screen.getByRole('button', { name: /12/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /12/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'CON' }));
    userEvent.click(screen.getByRole('button', { name: /10/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /10/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'INT' }));
    userEvent.click(screen.getByRole('button', { name: /8/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /8/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'WIS' }));
    userEvent.click(screen.getByRole('button', { name: /6/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /6/ })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: 'CHR' }));
    userEvent.click(screen.getByRole('button', { name: /^4$/ }));
    userEvent.click(screen.getByRole('button', { name: /Assign/ }));
    expect(screen.getByRole('button', { name: /^4$/ })).toBeDisabled();

    userEvent.click(screen.getByRole('button', { name: /Reset/ }));

    expect(screen.getByRole('button', { name: /14/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /12/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /10/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /8/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /6/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /^4$/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: /Reset/ })).toBeDisabled();
  });
});
