import RollOnce from "../../src/StatRollRules/RollOnce";
import MockGatewayADD2 from "../../src/DataAccess/mockGatewayADD2";

describe('<RollOnce />', () => {
  it('renders expected initial state', () => {
    cy.mount(<RollOnce />);

    cy.findByRole('button', { name: /Roll Stats/ }).should('exist');
    cy.findByRole('button', { name: /Save Stats/ }).should('exist');
  });

  it('displays an error message if save is clicked before rolling', () => {
    cy.mount(<RollOnce />);
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.findByRole('button', { name: /Save Stats/})
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('must roll stats to save');
        });
  });

  it('displays the expected output after rolling stats', () => {
    cy.mount(<RollOnce selectedChar={ testChar }
                       gateway={ new MockGatewayADD2() } />);

    cy.findByRole('button', { name: /Roll Stats/ }).click();

    cy.findByText(/STR: 3/).should('exist');
    cy.findByTestId('strRoll').should('have.text', '(1 + 1 + 1)');
    cy.findByText(/DEX: 4/).should('exist');
    cy.findByTestId('dexRoll').should('have.text', '(1 + 1 + 2)');
    cy.findByText(/CON: 5/).should('exist');
    cy.findByTestId('conRoll').should('have.text', '(1 + 2 + 2)');
    cy.findByText(/INT: 6/).should('exist');
    cy.findByTestId('intRoll').should('have.text', '(2 + 2 + 2)');
    cy.findByText(/WIS: 7/).should('exist');
    cy.findByTestId('wisRoll').should('have.text', '(2 + 2 + 3)');
    cy.findByText(/CHR: 8/).should('exist');
    cy.findByTestId('chrRoll').should('have.text', '(2 + 3 + 3)');
  });

  it('updates character as expected', () => {
    const onUpdateSpy = cy.spy().as('onUpdateSpy');
    cy.mount(<RollOnce selectedChar={ testChar }
                       gateway={ new MockGatewayADD2() }
                       onUpdate={ onUpdateSpy }/>);
    cy.findByRole('button', { name: /Roll Stats/ }).click();

    cy.findByRole('button', { name: /Save Stats/ }).click();

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
