import React from 'react';
import {shallow} from 'enzyme';
import AssignmentControl from '../AssignmentControl';

describe('AssignmentControl tests', () => {
    it('renders a top-level div with 2 buttons and 1 span if 1 roll provided', () => {
        const component = shallow(<AssignmentControl rolls={[{}]}/>);
        expect(component.find('div')).toHaveLength(1);
        expect(component.find('input')).toHaveLength(2);
        expect(component.find('span')).toHaveLength(1);
    });

    it('renders a top-level div with 3 buttons and 2 spans if 2 rolls provided', () => {
        const component = shallow(<AssignmentControl rolls={[{}, {}]}/>);
        expect(component.find('div')).toHaveLength(1);
        expect(component.find('input')).toHaveLength(3);
        expect(component.find('span')).toHaveLength(2);
    });

    describe('Stat selection button with one stat roll', () => {
        it('calls the onSelectStat handler once with the expected value', () => {
            const selectStatFunc = jest.fn();
            const component = shallow(<AssignmentControl stat={'TEST'} onSelectStat={selectStatFunc} rolls={[{}]}/>);

            component.find('input').at(0).simulate('click');

            expect(selectStatFunc).toHaveBeenCalledTimes(1);
            expect(selectStatFunc).toHaveBeenCalledWith('TEST');
        });

        it('has the expected value for the stat selection button', () => {
            const component = shallow(<AssignmentControl stat={'TEST'} rolls={[{}]}/>);

            expect(component.find('input').at(0).html()).toContain('value="TEST"');
        });

        it('displays the character stat value after the button', () => {
            const component = shallow(<AssignmentControl charStat={100} rolls={[{}]}/>);

            expect(component.find('div').text()).toEqual(' 100');
        });
    });

    describe('Roll selection button and roll text with one stat roll', () => {
        const testRoll = {id: 1, value: 99, assigned: true};

        it('calls the onSelectRoll handler once with the expected object', () => {
            const selectRollFunc = jest.fn();
            const component = shallow(<AssignmentControl onSelectRoll={selectRollFunc} rolls={[testRoll]}/>);

            component.find('input').at(1).simulate('click');

            expect(selectRollFunc).toHaveBeenCalledTimes(1);
            expect(selectRollFunc).toHaveBeenCalledWith(testRoll);
        });

        it('has the expected value for the roll selection button', () => {
            const component = shallow(<AssignmentControl rolls={[testRoll]}/>);

            expect(component.find('input').at(1).html()).toContain('value="99"');
        });

        it('disables the roll selection button if the roll is assigned', () => {
            const component = shallow(<AssignmentControl rolls={[testRoll]}/>);

            expect(component.find('input').at(1).html()).toContain('disabled=""');
        });

        it('enables the roll selection button if the roll is not assigned', () => {
            testRoll.assigned = false;
            const component = shallow(<AssignmentControl rolls={[testRoll]}/>);

            expect(component.find('input').at(1).html()).not.toContain('disabled');
        });

        it('displays the expected roll text', () => {
            testRoll.text = 'test text';
            const component= shallow(<AssignmentControl rolls={[testRoll]}/>);

            expect(component.find('span').text()).toBe('test text');
        });
    });

    describe('Stat selection button with two stat rolls', () => {
        const testRolls = [{}, {}];
        it('calls the onSelectStat handler once with the expected value', () => {
            const selectStatFunc = jest.fn();
            const component = shallow(<AssignmentControl stat={'TEST'} onSelectStat={selectStatFunc} rolls={testRolls}/>);

            component.find('input').at(0).simulate('click');

            expect(selectStatFunc).toHaveBeenCalledTimes(1);
            expect(selectStatFunc).toHaveBeenCalledWith('TEST');
        });

        it('has the expected value for the stat selection button', () => {
            const component = shallow(<AssignmentControl stat={'TEST'} rolls={testRolls}/>);

            expect(component.find('input').at(0).html()).toContain('value="TEST"');
        });

        it('displays the character stat value after the button', () => {
            const component = shallow(<AssignmentControl charStat={100} rolls={testRolls}/>);

            expect(component.find('div').text()).toEqual(' 100');
        });
    });

    describe('Roll selection button and roll text with two stat rolls', () => {
        const testRolls = [{id: 1, value: 100, text: 'test text 1', assigned: true},
            {id: 2, value: 200, text: 'test text 2', assigned: false}];

        it('calls the onSelectRoll handler with the first roll', () => {
            const selectRollFunc = jest.fn();
            const component = shallow(<AssignmentControl onSelectRoll={selectRollFunc} rolls={testRolls}/>);

            component.find('input').at(1).simulate('click');
            expect(selectRollFunc).toHaveBeenCalledTimes(1);
            expect(selectRollFunc).toHaveBeenCalledWith(testRolls[0]);
        });

        it('calls the onSelectRoll handler with the second roll', () => {
            const selectRollFunc = jest.fn();
            const component = shallow(<AssignmentControl onSelectRoll={selectRollFunc} rolls={testRolls}/>);

            component.find('input').at(2).simulate('click');
            expect(selectRollFunc).toHaveBeenCalledTimes(1);
            expect(selectRollFunc).toHaveBeenCalledWith(testRolls[1]);
        });

        it('has the expected value for the roll selection buttons', () => {
            const component = shallow(<AssignmentControl rolls={testRolls}/>);

            expect(component.find('input').at(1).html()).toContain('value="100"');
            expect(component.find('input').at(2).html()).toContain('value="200"');
        });

        it('disables and enables the roll selection buttons as expected', () => {
            const component = shallow(<AssignmentControl rolls={testRolls}/>);

            expect(component.find('input').at(1).html()).toContain('disabled=""');
            expect(component.find('input').at(2).html()).not.toContain('disabled=""');
        });

        it('displays the expected roll text', () => {
            const component = shallow(<AssignmentControl rolls={testRolls}/>);

            expect(component.find('span').at(0).text()).toBe('test text 1');
            expect(component.find('span').at(1).text()).toBe('test text 2');
        });
    });
});