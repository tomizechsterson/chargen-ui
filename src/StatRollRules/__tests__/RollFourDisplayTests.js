import React from 'react';
import {shallow} from 'enzyme';
import RollFourDisplay from '../RollFourDisplay';

describe('RollFour tests', () => {
    it('renders the top-level p tag', () => {
        const component = shallow(<RollFourDisplay selectedChar={{}} rolls={[]}/>);
        expect(component.find('p')).toHaveLength(1);
    });

    describe('when `selectedChar` has no stats and no rolls', () => {
        it('renders no stat and empty parentheses for roll text', () => {
            const component = shallow(<RollFourDisplay selectedChar={{}} rolls={[]}/>);
            const pTag = component.find('p');

            expect(pTag.text()).toContain('STR:  ()');
            expect(pTag.text()).toContain('DEX:  ()');
            expect(pTag.text()).toContain('CON:  ()');
            expect(pTag.text()).toContain('INT:  ()');
            expect(pTag.text()).toContain('WIS:  ()');
            expect(pTag.text()).toContain('CHR:  ()');
        });
    });

    describe('when `selectedChar` is defined, has rolls, and has stats', () => {
        it('renders the current stats and the rolls text', () => {
            const testChar = {str: 4, dex: 5, con: 6, int: 7, wis: 8, chr: 9};
            const testRolls = [[1, 1, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [4, 1, 1, 1], [5, 1, 1, 1], [6, 1, 1, 1]];
            const component = shallow(<RollFourDisplay selectedChar={testChar} rolls={testRolls}/>);
            const pTag = component.find('p');

            expect(pTag.text()).toContain('STR: 4 (1 + 1 + 1 + 1)');
            expect(pTag.text()).toContain('DEX: 5 (2 + 1 + 1 + 1)');
            expect(pTag.text()).toContain('CON: 6 (3 + 1 + 1 + 1)');
            expect(pTag.text()).toContain('INT: 7 (4 + 1 + 1 + 1)');
            expect(pTag.text()).toContain('WIS: 8 (5 + 1 + 1 + 1)');
            expect(pTag.text()).toContain('CHR: 9 (6 + 1 + 1 + 1)');
        });
    });
});