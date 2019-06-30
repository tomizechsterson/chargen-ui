describe('AD&D 2nd Edition Happy Path', () => {
    it('Can create an AD&D 2nd Edition character', () => {
        cy.visit('/');
        cy.get('.selectorHeader > li > a[href="/add2"]').click();
        cy.get('input').type('cypress test');
        cy.get('button').contains('Create').click();
        cy.get('tbody > tr').click();
        cy.get('select').select('rollTwice');
        cy.get('input[value="Roll Stats"]').click();
        cy.get('[style="color: rgb(153, 153, 153);"]');
        cy.get('input[value="Save Stats"]').click();
        cy.contains('Select race');
    });
});
