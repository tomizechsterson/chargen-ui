import React from 'react';
import {shallow} from 'enzyme';
import ADD2RaceSelection from '../ADD2RaceSelection';

describe('ADD2RaceSelection tests', () => {
    it('renders without exploding', () => {
        const component = shallow(<ADD2RaceSelection selectedChar={{}}/>);
        expect(component.find('div')).toHaveLength(1);
    });

    it('renders the stats of the selected character', () => {
        const testChar = {id: 1, str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8};
        const component = shallow(<ADD2RaceSelection selectedChar={testChar}/>);

        expect(component.text()).toContain('STR: 3');
        expect(component.text()).toContain('DEX: 4');
        expect(component.text()).toContain('CON: 5');
        expect(component.text()).toContain('INT: 6');
        expect(component.text()).toContain('WIS: 7');
        expect(component.text()).toContain('CHR: 8');
    });
});