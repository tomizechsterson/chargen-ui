describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/');
        cy.url().should('equal', Cypress.config('baseUrl'));
        cy.contains('Home');
        cy.contains('AD&D 2nd Edition');
        cy.contains('D&D 3.5');
    });
});
