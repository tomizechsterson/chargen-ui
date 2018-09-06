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

            expect(component.text()).toContain('STR: 3');
            expect(component.text()).toContain('DEX: 4');
            expect(component.text()).toContain('CON: 5');
            expect(component.text()).toContain('INT: 6');
            expect(component.text()).toContain('WIS: 7');
            expect(component.text()).toContain('CHR: 8');

            expect(component.text()).toContain('HP: 9');
            expect(component.text()).toContain('Movement Rate: 10');
            expect(component.text()).toContain('Funds: 11');
        });
    });
});