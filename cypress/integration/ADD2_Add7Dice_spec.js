describe('Add 7 Dice', () => {
    it('Can assign 7 dice to stats', () => {
        cy.visit('/add2');
        cy.location('pathname').should('eq', '/add2');
        cy.createTestCharacter();
        cy.chooseRollRuleAndRollStats('add7Dice');
        cy.get('[data-cy=statAssignmentDiv]').should('include.text', 'Selected Stat: , Selected Roll: ');
        assignRolls();
        assignLastRoll();
        cy.get('button').contains('Reset').click();
        assignRolls();
        assignLastRoll();
        cy.finishCharacter();
    });

    const assignRolls = () => {
        assignRoll('STR', 1);
        assignRoll('DEX', 2);
        assignRoll('CON', 3);
        assignRoll('INT', 4);
        assignRoll('WIS', 5);
        assignRoll('CHR', 6);
    };

    const assignRoll = (stat, rollNum) => {
        cy.get('button').contains('Assign').should('be.disabled');
        cy.get('[data-cy=statAssignmentDiv] > button').contains(stat).click();
        cy.get('[data-cy=statAssignmentDiv]').should('include.text', `Selected Stat: ${stat}, Selected Roll: `);
        cy.get(`[data-cy=add7Rolls] > :nth-child(${rollNum})`).click();
        cy.get('button').contains('Assign').should('not.be.disabled');
        cy.get('button').contains('Assign').click();
        cy.get(`[data-cy=add7Rolls] > :nth-child(${rollNum})`).should('be.disabled');
    };

    const assignLastRoll = () => {
        cy.log('assignLastRoll');
        cy.get('[data-cy=add7Rolls] > :nth-child(7)').then(($btn) => {
            const lastRollValue = parseInt($btn[0].textContent);
            let lastIsAssigned = false;

            cy.get('[data-cy=statAssignmentDiv] > [data-cy=add7Stat]').each(($el) => {
                const statValue = parseInt($el[0].nextSibling.nextSibling.textContent);
                const total = lastRollValue + statValue;
                if(total < 19 && !lastIsAssigned)
                {
                    cy.log(`${$el[0].textContent} is good`);
                    const stat = $el[0].textContent;
                    assignRoll(stat, 7);
                    lastIsAssigned = true;
                }
            });
        });
    };
});
