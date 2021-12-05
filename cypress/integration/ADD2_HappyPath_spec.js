describe('AD&D 2nd Edition Happy Path', () => {
    it('Can create and delete an AD&D 2nd Edition character', () => {
        cy.visit('/');
        cy.get('.selectorHeader > li > a[href="/add2"]').click();
        cy.location('pathname').should('eq', '/add2');
        cy.createTestCharacter();
        cy.chooseRollRuleAndRollStats('rollTwice');
        cy.get('[style="color: rgb(153, 153, 153);"]');
        cy.chooseRollRuleAndRollStats('rollOnce');
        cy.get('[style="color: rgb(153, 153, 153);"]');
        cy.chooseRollRuleAndRollStats('roll4');
        cy.get('[style="color: rgb(153, 153, 153);"]');
        cy.finishCharacter();
    });
});
