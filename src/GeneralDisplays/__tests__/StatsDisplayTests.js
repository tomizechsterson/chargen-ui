import React from 'react';
import {shallow} from 'enzyme';
import StatsDisplay from '../StatsDisplay';

describe('StatsDisplay tests', () => {
    it('renders a top-level div', () => {
        const component = shallow(<StatsDisplay selectedChar={{}}/>);
        expect(component.find('div')).toHaveLength(1);
    });

    describe('when `selectedChar` is defined', () => {
        it('renders the expected stats', () => {
            const testChar = {str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8, hp: 9, moveRate: 10, funds: 11};
            const component = shallow(<StatsDisplay selectedChar={testChar}/>);

            const abilityScores = component.find('p').first();
            expect(abilityScores.text()).toContain('STR: 3');
            expect(abilityScores.text()).toContain('DEX: 4');
            expect(abilityScores.text()).toContain('CON: 5');
            expect(abilityScores.text()).toContain('INT: 6');
            expect(abilityScores.text()).toContain('WIS: 7');
            expect(abilityScores.text()).toContain('CHR: 8');

            const otherStats = component.find('p').at(1);
            expect(otherStats.text()).toContain('HP: 9');
            expect(otherStats.text()).toContain('Movement Rate: 10');
            expect(otherStats.text()).toContain('Funds: 11');
        });
    });
});