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

    it('alignment drop down changes state to selected alignment', () => {
        const component = shallow(<ADD2AlignmentSelection selectedChar={{availableAlignments: []}}/>);
        const dropDown = component.find('select');

        dropDown.simulate('change', {target: {value: 'test1'}});
        expect(component.state().selectedAlignment).toBe('test1');
    });

    describe('Save Button', () => {
        let updateFunc, testChar, component;
        beforeEach(() => {
            updateFunc = jest.fn();
            testChar = {completionStep: 4, availableAlignments: []};
            component = shallow(<ADD2AlignmentSelection onUpdate={updateFunc} selectedChar={testChar}/>);
        });

        it('does not call onUpdate if no alignment is selected', () => {
            component.find('button').simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('calls onUpdate with the expected alignment and increments completionStep', () => {
            component.setState({selectedAlignment: 'testAlignment'});
            component.find('button').simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
            expect(updateFunc).toHaveBeenCalledWith({completionStep: 5, alignment: 'testAlignment', availableAlignments: []});
        });
    });
});