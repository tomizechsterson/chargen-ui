describe('Stat Assignment', () => {
    const selectRolls = (statDiv, selectorDiv) => {
        selectRoll('STR', 0, statDiv, selectorDiv);
        selectRoll('DEX', 1, statDiv, selectorDiv);
        selectRoll('CON', 2, statDiv, selectorDiv);
        selectRoll('INT', 3, statDiv, selectorDiv);
        selectRoll('WIS', 4, statDiv, selectorDiv);
        selectRoll('CHR', 5, statDiv, selectorDiv);
    };

    const selectRolls2x = (statDiv, selectorDiv) => {
        selectRoll('STR', 1, statDiv, selectorDiv);
        selectRoll('DEX', 3, statDiv, selectorDiv);
        selectRoll('CON', 5, statDiv, selectorDiv);
        selectRoll('INT', 7, statDiv, selectorDiv);
        selectRoll('WIS', 9, statDiv, selectorDiv);
        selectRoll('CHR', 11, statDiv, selectorDiv);
    };

    const selectRoll = (stat, rollId, statDiv, selectorDiv) => {
        cy.get(`input[value="${stat}"]`).click();
        cy.get(`[data-cy=${statDiv}]`).contains(`Selected Stat: ${stat}, Selected Roll: `);
        cy.get(`[data-cy=roll${rollId}]`).then(($btn) => {
            const val = $btn[0].value;
            cy.wrap($btn).click();
            cy.get(`[data-cy=${statDiv}]`).contains(`Selected Stat: ${stat}, Selected Roll: ${val}`);
            cy.get('input[value="Assign"]').click();
            cy.get(`[data-cy=${selectorDiv}${stat}]`).contains(`${val}`);
        });
    };

    it('Can do stat assignment successfully', () => {
        cy.visit('/add2');
        cy.location('pathname').should('eq', '/add2');
        cy.createTestCharacter();
        cy.chooseRollRuleAndRollStats('assignment');
        cy.get('[data-cy=statAssignmentDiv]').contains('Selected Stat: , Selected Roll: ');
        selectRolls('statAssignmentDiv', 'singleAssignmentSelector');
        cy.get('input[value="Reset"]').click();
        selectRolls('statAssignmentDiv', 'singleAssignmentSelector');
        cy.finishCharacter();
    });

    it('Can do double stat assignment successfully', () => {
        cy.visit('/add2');
        cy.location('pathname').should('eq', '/add2');
        cy.createTestCharacter();
        cy.chooseRollRuleAndRollStats('assignment2x');
        cy.get('[data-cy=statAssignment2xDiv]').contains('Selected Stat: , Selected Roll: ');
        selectRolls2x('statAssignment2xDiv', 'doubleAssignmentSelector');
        cy.get('input[value="Reset"]').click();
        selectRolls2x('statAssignment2xDiv', 'doubleAssignmentSelector');
        cy.finishCharacter();
    });
});
