import RollOnce from "../../src/StatRollRules/RollOnce";
import MockGatewayADD2 from "../../src/DataAccess/mockGatewayADD2";

describe('<RollOnce />', () => {
  it('renders expected initial state', () => {
    cy.mount(<RollOnce />);

    cy.get('button').contains('Roll Stats').should('exist');
    cy.get('button').contains('Save Stats').should('exist');
  });

  it('displays an error message if save is clicked before rolling', () => {
    cy.mount(<RollOnce />);
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('button').contains('Save Stats')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('must roll stats to save');
        });
  });

  it('displays the expected output after rolling stats', () => {
    cy.mount(<RollOnce selectedChar={ testChar }
                       gateway={ new MockGatewayADD2() } />);

    cy.get('button').contains('Roll Stats').click();

    cy.contains('STR: 3');
    cy.contains('(1 + 1 + 1)');
    cy.contains('DEX: 4');
    cy.contains('(1 + 1 + 2)');
    cy.contains('CON: 5');
    cy.contains('(1 + 2 + 2)');
    cy.contains('INT: 6');
    cy.contains('(2 + 2 + 2)');
    cy.contains('WIS: 7');
    cy.contains('(2 + 2 + 3)');
    cy.contains('CHR: 8');
    cy.contains('(2 + 3 + 3)');
  });

  it('updates character as expected', () => {
    const onUpdateSpy = cy.spy().as('onUpdateSpy');
    cy.mount(<RollOnce selectedChar={ testChar }
                       gateway={ new MockGatewayADD2() }
                       onUpdate={ onUpdateSpy }/>);
    cy.get('button').contains('Roll Stats').click();

    cy.get('button').contains('Save Stats').click();

    // This doesn't care what it's called with... A cypress bug....???
    cy.get('@onUpdateSpy').should('have.been.calledWith', updatedChar);
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
})
