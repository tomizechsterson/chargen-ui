describe('Stat Assignment', () => {
    const selectRolls = () => {
        selectRoll('STR', 0);
        selectRoll('DEX', 1);
        selectRoll('CON', 2);
        selectRoll('INT', 3);
        selectRoll('WIS', 4);
        selectRoll('CHR', 5);
    };

    const selectRoll = (stat, rollId) => {
        cy.get(`input[value="${stat}"]`).click();
        cy.get('[data-cy=statAssignmentDiv]').contains(`Selected Stat: ${stat}, Selected Roll: `);
        cy.get(`[data-cy=roll${rollId}]`).then(($btn) => {
            const val = $btn[0].value;
            cy.wrap($btn).click();
            cy.get('[data-cy=statAssignmentDiv]').contains(`Selected Stat: ${stat}, Selected Roll: ${val}`);
            cy.get('input[value="Assign"]').click();
            cy.get(`[data-cy=singleAssignmentSelector${stat}]`).contains(`${val}`);
        });
    };

    it('Can do stat assignment successfully', () => {
        cy.visit('/add2');
        cy.location('pathname').should('eq', '/add2');
        cy.createTestCharacter();
        cy.chooseRollRuleAndRollStats('assignment');
        cy.get('[data-cy=statAssignmentDiv]').contains('Selected Stat: , Selected Roll: ');
        selectRolls();
        cy.get('input[value="Reset"]').click();
        selectRolls();
        cy.finishCharacter();
    });
});
