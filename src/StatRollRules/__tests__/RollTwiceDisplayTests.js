import React from 'react';
import {shallow} from 'enzyme';
import RollTwiceDisplay from '../RollTwiceDisplay';

describe('RollTwiceDisplay tests', () => {
    it('renders a top-level p tag', () => {
        const component = shallow(<RollTwiceDisplay selectedChar={{}} rolls={[]}/>);
        expect(component.find('p')).toHaveLength(1);
    });

    describe('when `selectedChar` has no stats and no rolls', () => {
        it('renders nothing beyond the stat label', () => {
            const component = shallow(<RollTwiceDisplay selectedChar={{}} rolls={[]}/>);

            const pTag = component.find('p');
            expect(pTag.text()).toContain('STR:  ');
            expect(pTag.text()).toContain('DEX:  ');
            expect(pTag.text()).toContain('CON:  ');
            expect(pTag.text()).toContain('INT:  ');
            expect(pTag.text()).toContain('WIS:  ');
            expect(pTag.text()).toContain('CHR:  ');
        });
    });

    describe('when `selectedChar` is defined and has rolls and stats', () => {
        it('renders the current stats and rolls text', () => {
            const testChar = {str: 4, dex: 6, con: 8, int: 8, wis: 6, chr: 4};
            const testRolls = [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
                [2, 3, 3], [2, 2, 3], [2, 2, 2], [1, 2, 2], [1, 1, 2], [1, 1, 1]];
            const component = shallow(<RollTwiceDisplay selectedChar={testChar} rolls={testRolls}/>);

            const pTag = component.find('p');
            expect(pTag.text()).toContain('STR: 4 (3:  1 + 1 + 1), (4:  1 + 1 + 2)');
            expect(pTag.text()).toContain('DEX: 6 (5:  1 + 2 + 2), (6:  2 + 2 + 2)');
            expect(pTag.text()).toContain('CON: 8 (7:  2 + 2 + 3), (8:  2 + 3 + 3)');
            expect(pTag.text()).toContain('INT: 8 (8:  2 + 3 + 3), (7:  2 + 2 + 3)');
            expect(pTag.text()).toContain('WIS: 6 (6:  2 + 2 + 2), (5:  1 + 2 + 2)');
            expect(pTag.text()).toContain('CHR: 4 (4:  1 + 1 + 2), (3:  1 + 1 + 1)');
        });
    });
});