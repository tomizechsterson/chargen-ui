describe('AD&D 2nd Edition Happy Path Without Stubbing', () => {
    it('Can create an AD&D 2nd Edition character', () => {
        cy.visit('/');
        cy.get('.selectorHeader > li > a[href="/add2"]').click();
        cy.url().should('includes', '/add2');
        cy.get('input').type('cypress test').should('have.value', 'cypress test');
        cy.get('button').contains('Create').click();
        cy.get('tbody > tr').contains('cypress test').parent().contains('No').click();
        cy.get('[data-cy=statRollSelect]').select('rollTwice');
        cy.get('input[value="Roll Stats"]').click();
        cy.get('[style="color: rgb(153, 153, 153);"]');
        cy.get('input[value="Save Stats"]').click();
        cy.contains('Select race');
        cy.get('[data-cy=raceSelect]').select('Human');
        cy.get('[type="radio"]').check('M');
        cy.get('button').contains('Save').click();
        cy.contains('Select class');
        cy.get('[data-cy=classSelect]').then(($select) => {
            const option = $select[0][1];
            const text = option.text;
            cy.get('[data-cy=classSelect]').select(text);
        });
        cy.contains('Select alignment');
        cy.get('[data-cy=alignmentSelect').select('Lawful Good');
        cy.contains('Saving Throws');
        cy.get('[data-cy=rollVitalsButton').click();
        cy.get('[data-cy=rollHpGpButton').click();
        cy.get('[data-cy=finalSaveButton').click();
        cy.get('tbody > tr').contains('cypress test').parent().contains('Yes');
        cy.get('button').contains('Delete').click();
        cy.get('tbody > tr td:contains("cypress test")').should('not.exist');
    });
});
