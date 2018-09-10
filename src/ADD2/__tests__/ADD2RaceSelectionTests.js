import React from 'react';
import {shallow} from 'enzyme';
import ADD2RaceSelection from '../ADD2RaceSelection';
import ServerGateway from "../../ServerGateway";

describe('ADD2RaceSelection tests', () => {
    it('renders the stats of the selected character', () => {
        const testChar = {id: 1, str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8, availableRaces: []};
        const component = shallow(<ADD2RaceSelection selectedChar={testChar} gateway={new ServerGateway()}/>);

        expect(component.text()).toContain('STR: 3');
        expect(component.text()).toContain('DEX: 4');
        expect(component.text()).toContain('CON: 5');
        expect(component.text()).toContain('INT: 6');
        expect(component.text()).toContain('WIS: 7');
        expect(component.text()).toContain('CHR: 8');
    });

    it('renders the available races', () => {
        const testChar = {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3, availableRaces: ['race1', 'race2']};
        const component = shallow(<ADD2RaceSelection selectedChar={testChar} gateway={new ServerGateway()}/>);

        expect(component.text()).toContain('race1');
        expect(component.text()).toContain('race2');
    });
});