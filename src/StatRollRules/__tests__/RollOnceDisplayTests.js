import React from 'react';
import {shallow} from 'enzyme';
import RollOnceDisplay from '../RollOnceDisplay';

describe('RollOnceDisplay tests', () => {
    it('renders a top-level p tag', () => {
        const component = shallow(<RollOnceDisplay selectedChar={{}} rolls={[]}/>);
        expect(component.find('p')).toHaveLength(1);
    });

    describe('when `selectedChar` has no stats and no rolls', () => {
        it('renders no stat and empty parentheses for rolls', () => {
            const component = shallow(<RollOnceDisplay selectedChar={{}} rolls={[]}/>);

            const pTag = component.find('p');
            expect(pTag.text()).toContain('STR:  ()');
            expect(pTag.text()).toContain('DEX:  ()');
            expect(pTag.text()).toContain('CON:  ()');
            expect(pTag.text()).toContain('INT:  ()');
            expect(pTag.text()).toContain('WIS:  ()');
            expect(pTag.text()).toContain('CHR:  ()');
        });
    });

    describe('when `selectedChar` is defined and has rolls and stats', () => {
        it('renders the current stats and the rolls text', () => {
            const testChar = {str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8};
            const testRolls = [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]];
            const component = shallow(<RollOnceDisplay selectedChar={testChar} rolls={testRolls}/>);

            const pTag = component.find('p');
            expect(pTag.text()).toContain('STR: 3 (1 + 1 + 1)');
            expect(pTag.text()).toContain('DEX: 4 (1 + 1 + 2)');
            expect(pTag.text()).toContain('CON: 5 (1 + 2 + 2)');
            expect(pTag.text()).toContain('INT: 6 (2 + 2 + 2)');
            expect(pTag.text()).toContain('WIS: 7 (2 + 2 + 3)');
            expect(pTag.text()).toContain('CHR: 8 (2 + 3 + 3)');
        });
    });
});