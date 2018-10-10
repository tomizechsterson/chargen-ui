import React from 'react';
import {shallow} from 'enzyme';
import ADD2RaceSelection from '../ADD2RaceSelection';

describe('ADD2RaceSelection tests', () => {
    it('renders the available races', () => {
        const testChar = {availableRaces: ['race1', 'race2']};
        const component = shallow(<ADD2RaceSelection selectedChar={testChar}/>);
        component.setState({adjustments: [{}]});

        expect(component.text()).toContain('race1');
        expect(component.text()).toContain('race2');
    });

    describe('Race Drop Down', () => {
        it('Changes state as expected', () => {
            function mockGateway() {return {getAdjustments: () => {return []}}}
            const component = shallow(<ADD2RaceSelection gateway={mockGateway()} selectedChar={{availableRaces: []}}/>);
            const raceDropDown = component.find('select');

            raceDropDown.simulate('change', {target: {value: 'test'}});
            expect(component.state().selectedRace).toBe('test');
        });
    });

    describe('Save Button', () => {
        let updateFunc, component;
        beforeEach(() => {
            updateFunc = jest.fn();
            component = shallow(<ADD2RaceSelection onUpdate={updateFunc} selectedChar={{completionStep: 2, str: 4, dex: 4, con: 4, int: 4, wis: 4, chr: 4, availableRaces: []}}/>);
            component.setState({adjustments: [{}]});
        });

        it('does not call onUpdate if no race is selected', () => {
            component.find('button').at(0).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('does not call onUpdate if no gender is selected', () => {
            component.setState({selectedRace: 'something'});

            component.find('button').simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('calls onUpdate once with the expected race and gender and increments completionStep', () => {
            component.setState({selectedRace: 'testRace', adjustments: [{}]});
            component.find('input').at(1).simulate('change', {target: {value: 'F'}});

            component.find('button').at(0).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
            expect(component.instance().props.selectedChar.str).toBe(4);
            expect(component.instance().props.selectedChar.dex).toBe(4);
            expect(component.instance().props.selectedChar.con).toBe(4);
            expect(component.instance().props.selectedChar.int).toBe(4);
            expect(component.instance().props.selectedChar.wis).toBe(4);
            expect(component.instance().props.selectedChar.chr).toBe(4);
            expect(component.instance().props.selectedChar.completionStep).toBe(3);
            expect(component.instance().props.selectedChar.race).toBe('testRace');
            expect(component.instance().props.selectedChar.gender).toBe('F');
        });

        it('applies stat adjustments', () => {
            component.setState({adjustments:
                    [{'key': 'str', 'value': 1}, {'key': 'dex', 'value': -1},
                    {'key': 'con', 'value': 2}, {'key': 'int', 'value': 3},
                    {'key': 'wis', 'value': 4}, {'key': 'chr', 'value': 5}],
                selectedRace: 'test', selectedGender: 'test'});

            component.find('button').at(0).simulate('click');

            expect(component.instance().props.selectedChar.str).toBe(5);
            expect(component.instance().props.selectedChar.dex).toBe(3);
            expect(component.instance().props.selectedChar.con).toBe(6);
            expect(component.instance().props.selectedChar.int).toBe(7);
            expect(component.instance().props.selectedChar.wis).toBe(8);
            expect(component.instance().props.selectedChar.chr).toBe(9);
        });
    });
});