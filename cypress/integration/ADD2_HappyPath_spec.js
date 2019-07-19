describe('AD&D 2nd Edition Happy Path Without Stubbing', () => {
    it('Can create and delete an AD&D 2nd Edition character', () => {
        cy.visit('/');
        cy.get('.selectorHeader > li > a[href="/add2"]').click();
        cy.url().should('includes', '/add2');
        cy.createTestCharacter();
        cy.chooseRollRuleAndRollStats('rollTwice');
        cy.get('[style="color: rgb(153, 153, 153);"]');
        cy.finishCharacter();
    });
});
