import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ADD2Characters from '../ADD2Characters';
import MockGatewayADD2 from "../../DataAccess/mockGatewayADD2";

describe('ADD2Characters', () => {
  it('does not display Delete button before a character is selected', () => {
    render(<ADD2Characters serverGateway={ new MockGatewayADD2() } />);

    expect(screen.queryByRole('button', { name: /Delete/ })).not.toBeInTheDocument();
  });

  it('Adds a character to the table via button and enter key', () => {
    render(<ADD2Characters serverGateway={ new MockGatewayADD2() } />);
    expect(screen.queryAllByRole('row').length).toBe(0);
    userEvent.type(screen.getByRole('textbox'), `${testData[0].name}`);
    expect(screen.getByRole('textbox')).toHaveValue('test1');

    userEvent.click(screen.getByRole('button', { name: /Create/ }));

    expect(screen.queryAllByRole('row').length).toBe(2); // This counts the header row
    expect(screen.getByRole('row', { name: /test/})).toBeInTheDocument();

    userEvent.type(screen.getByRole('textbox'), `${testData[1].name}{enter}`);

    expect(screen.queryAllByRole('row').length).toBe(3); // This counts the header row
    expect(screen.getByRole('row', { name: /test2/})).toBeInTheDocument();
  });

  it('prevents adding a new character if only spaces or blank with button and enter key', () => {
    render(<ADD2Characters serverGateway={ new MockGatewayADD2() } />);
    expect(screen.queryAllByRole('row').length).toBe(0);

    userEvent.click(screen.getByRole('button', { name: /Create/ }));

    expect(screen.queryAllByRole('row').length).toBe(0);

    userEvent.type(screen.getByRole('textbox'), '    ');
    expect(screen.getByRole('textbox')).toHaveValue('    ');

    userEvent.click(screen.getByRole('button', { name: /Create/ }));

    expect(screen.queryAllByRole('row').length).toBe(0);
    expect(screen.getByRole('textbox')).toHaveValue('');

    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(screen.queryAllByRole('row').length).toBe(0);

    userEvent.type(screen.getByRole('textbox'), '    {enter}');

    expect(screen.queryAllByRole('row').length).toBe(0);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('prevents adding a character with duplicate name', () => {
    render(<ADD2Characters serverGateway={ new MockGatewayADD2() } />);
    expect(screen.queryAllByRole('row').length).toBe(0);

    userEvent.type(screen.getByRole('textbox'), `${testData[0].name}{enter}`);
    expect(screen.getByRole('row', { name: /test/ })).toBeInTheDocument();
    expect(screen.queryAllByRole('row').length).toBe(2);

    userEvent.type(screen.getByRole('textbox'), `${testData[0].name}`);
    userEvent.click(screen.getByRole('button', { name: /Create/ }));

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.queryAllByRole('row').length).toBe(2);
  });

  it('displays delete button after a character is selected', () => {
    render(<ADD2Characters serverGateway={ new MockGatewayADD2() } />);
    userEvent.type(screen.getByRole('textbox'), `${testData[0].name}{enter}`);

    userEvent.click(screen.getByRole('row', { name: /test1/ }));

    expect(screen.getByRole('button', { name: /Delete/ })).toBeInTheDocument();
  });

  it('allows deleting a character', () => {
    render(<ADD2Characters serverGateway={ new MockGatewayADD2() } />);
    window.confirm = jest.fn(() => true);
    userEvent.type(screen.getByRole('textbox'), `${testData[0].name}{enter}`);
    userEvent.type(screen.getByRole('textbox'), `${testData[1].name}{enter}`);
    expect(screen.queryAllByRole('row')).toHaveLength(3);

    userEvent.click(screen.getByRole('row', { name: /test2/ }));
    userEvent.click(screen.getByRole('button', { name: /Delete/ }));

    expect(screen.queryAllByRole('row')).toHaveLength(2);
  });

  it('can cancel character deletion', () => {
    render(<ADD2Characters serverGateway={ new MockGatewayADD2() } />);
    window.confirm = jest.fn(() => false);
    userEvent.type(screen.getByRole('textbox'), `${testData[0].name}{enter}`);
    userEvent.type(screen.getByRole('textbox'), `${testData[1].name}{enter}`);
    expect(screen.queryAllByRole('row')).toHaveLength(3);

    userEvent.click(screen.getByRole('row', { name: /test1/ }));
    userEvent.click(screen.getByRole('button', { name: /Delete/ }));

    expect(screen.queryAllByRole('row')).toHaveLength(3);
  });

  const testData =
  [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' }
  ];
});
