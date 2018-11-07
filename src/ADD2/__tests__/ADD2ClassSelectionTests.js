import React from 'react';
import {shallow} from 'enzyme';
import ADD2ClassSelection from '../ADD2ClassSelection';

describe('ADD2 Class Selection Tests', () => {
    it('renders the stats of the selected character', () => {
        const testChar = {str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8, availableClasses: []};
        const component = shallow(<ADD2ClassSelection selectedChar={testChar}/>);
        expect(component.text()).toContain('STR: 3');
        expect(component.text()).toContain('DEX: 4');
        expect(component.text()).toContain('CON: 5');
        expect(component.text()).toContain('INT: 6');
        expect(component.text()).toContain('WIS: 7');
        expect(component.text()).toContain('CHR: 8');
    });

    it('renders the race and gender of the selected character', () => {
        const testChar = {race: 'testRace', gender: 'M'};
        const component = shallow(<ADD2ClassSelection selectedChar={testChar}/>);
        expect(component.text()).toContain('Race: testRace');
        expect(component.text()).toContain('Gender: M');
    });

    it('renders the available classes', () => {
        const testChar = {availableClasses: ['class1', 'class2']};
        const component = shallow(<ADD2ClassSelection selectedChar={testChar}/>);
        expect(component.text()).toContain('class1');
        expect(component.text()).toContain('class2');
    });

    describe('Class Drop Down', () => {
        it('calls update function if a valid class was selected', () => {
            const updateFunc = jest.fn();
            const component = shallow(<ADD2ClassSelection selectedChar={{availableClasses: []}} onUpdate={updateFunc}/>);
            const classDropDown = component.find('select');

            classDropDown.simulate('change', {target: {value: 'test1'}});
            expect(updateFunc).toHaveBeenCalledTimes(1);
        });

        it('does not call update function if no class is selected (selected blank entry)', () => {
            const updateFunc = jest.fn();
            const component = shallow(<ADD2ClassSelection selectedChar={{availableClasses: []}} onUpdate={updateFunc}/>);
            const classDropDown = component.find('select');

            classDropDown.simulate('change', {target: {value: ''}});
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });
    });
});