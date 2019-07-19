describe('D&D 3.5 Happy Path Without Stubbing', () => {
    it('Can create and delete a D&D 3.5 Character', () => {
        cy.visit('/');
        cy.get('.selectorHeader > li > a[href="/dd35"]').click();
        cy.url().should('includes', '/dd35');
        cy.get('input').type('cypress test').should('have.value', 'cypress test');
        cy.get('button').contains('Create').click();
        cy.get('tbody > tr').contains('cypress test').parent().contains('Edit').click();
        cy.get('button').contains('Close').click();
        cy.get('tbody > tr').contains('cypress test').parent().contains('Delete').click();
        cy.get('tbody > tr td:contains("cypress test")').should('not.exist');
    });
});
