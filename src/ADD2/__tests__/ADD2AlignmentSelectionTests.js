import React from 'react';
import {shallow} from 'enzyme';
import ADD2AlignmentSelection from '../ADD2AlignmentSelection';

describe('ADD2 Alignment Selection Tests', () => {
    it('renders the stats of the selected character', () => {
        const testChar = {str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8, availableAlignments: []};
        const component = shallow(<ADD2AlignmentSelection selectedChar={testChar}/>);
        expect(component.text()).toContain('STR: 3');
        expect(component.text()).toContain('DEX: 4');
        expect(component.text()).toContain('CON: 5');
        expect(component.text()).toContain('INT: 6');
        expect(component.text()).toContain('WIS: 7');
        expect(component.text()).toContain('CHR: 8');
    });

    it('renders the race, gender, and class of the selected character', () => {
        const testChar = {race: 'testRace', gender: 'F', className: 'testClass'};
        const component = shallow(<ADD2AlignmentSelection selectedChar={testChar}/>);
        expect(component.text()).toContain('Race: testRace');
        expect(component.text()).toContain('Gender: F');
        expect(component.text()).toContain('Class: testClass');
    });

    it('renders the available alignments', () => {
        const testChar = {availableAlignments: ['test1', 'test2']};
        const component = shallow(<ADD2AlignmentSelection selectedChar={testChar}/>);
        expect(component.text()).toContain('test1');
        expect(component.text()).toContain('test2');
    });

    describe('alignment drop down', () => {
        it('calls update function when a valid alignment is selected', () => {
            const updateFunc = jest.fn();
            const component = shallow(<ADD2AlignmentSelection selectedChar={{availableAlignments: []}} onUpdate={updateFunc}/>);
            const dropDown = component.find('select');

            dropDown.simulate('change', {target: {value: 'test1'}});
            expect(updateFunc).toHaveBeenCalledTimes(1);
        });

        it('does not call update function if no alignment selected (blank entry)', () => {
            const updateFunc = jest.fn();
            const component = shallow(<ADD2AlignmentSelection selectedChar={{availableAlignments: []}} onUpdate={updateFunc}/>);
            const dropDown = component.find('select');

            dropDown.simulate('change', {target: {value: ''}});
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });
    });
});