describe('AD&D 2nd Edition Happy Path Without Stubbing', () => {
    it('Can create an AD&D 2nd Edition character', () => {
        cy.visit('/');
        cy.get('.selectorHeader > li > a[href="/add2"]').click();
        cy.get('input').type('cypress test');
        cy.get('button').contains('Create').click();
        cy.get('tbody > tr').click();
        cy.get('#statRollSelect').select('rollTwice');
        cy.get('input[value="Roll Stats"]').click();
        cy.get('[style="color: rgb(153, 153, 153);"]');
        cy.get('input[value="Save Stats"]').click();
        cy.contains('Select race');
        cy.get('#raceSelect').select('Human');
        cy.get('[type="radio"]').check('M');
        cy.get('button').contains('Save').click();
        cy.get('#classSelect').trigger('mousedown');
        cy.get('#classSelect > option').first().next().click();

        cy.get('button').contains('Delete').click();
    });
});
