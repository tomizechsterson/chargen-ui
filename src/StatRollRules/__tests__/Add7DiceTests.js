import React from 'react';
import {shallow} from 'enzyme';
import Add7Dice from '../Add7Dice';

describe('Add7Dice tests', () => {
    describe('Save Stats button', () => {
        let updateFunc, component;

        beforeEach(() => {
            updateFunc = jest.fn();
            component = shallow(<Add7Dice selectedChar={{completionStep: 1}} onUpdate={updateFunc}/>);
        });

        it('calls onUpdate properly if all rolls are assigned', () => {
            component.setState({selectedChar: getTestChar(), rolls: [{assigned: true}, {assigned: true}]});
            component.find('button').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(1);
            expect(updateFunc).toHaveBeenCalledWith(component.instance().props.selectedChar);
        });

        it('updates the stats on the props character if all rolls are assigned', () => {
            component.setState({selectedChar: getTestChar(), rolls: [{assigned: true}, {assigned: true}]});

            component.find('button').at(1).simulate('click');

            const propsChar = component.instance().props.selectedChar;
            expect(propsChar.str).toBe(3);
            expect(propsChar.dex).toBe(4);
            expect(propsChar.con).toBe(5);
            expect(propsChar.int).toBe(6);
            expect(propsChar.wis).toBe(7);
            expect(propsChar.chr).toBe(8);
            expect(propsChar.completionStep).toBe(2);
        });

        it('does not call onUpdate if all rolls are not assigned', () => {
            component.setState({rolls: [{assigned: false}, {assigned: true}]});
            component.find('button').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        const getTestChar = () => {
            return {str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8};
        };
    });

    describe('Roll Stats button', () => {
        let component;
        function mockGateway() {return {
            rollStats: () => {return [[1], [2], [3], [4], [5], [6], [1]]}
        }}
        function tick() {
            return new Promise(resolve => {setTimeout(resolve, 0)});
        }
        beforeEach(() => {
            component = shallow(<Add7Dice gateway={mockGateway()}/>);
        });

        it('resets the stats of selectedChar in state to 8', async () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3}});

            component.find('button').at(0).simulate('click');
            await tick();

            expect(component.state().selectedChar.str).toBe(8);
            expect(component.state().selectedChar.dex).toBe(8);
            expect(component.state().selectedChar.con).toBe(8);
            expect(component.state().selectedChar.int).toBe(8);
            expect(component.state().selectedChar.wis).toBe(8);
            expect(component.state().selectedChar.chr).toBe(8);
        });

        it('populates the expected roll objects with the response data', async () => {
            component.setState({selectedChar: {}});

            component.find('button').at(0).simulate('click');
            await tick();

            const rollObjects = component.state().rolls;
            assertRollObject(rollObjects[0], 0, false, 1);
            assertRollObject(rollObjects[1], 1, false, 2);
            assertRollObject(rollObjects[2], 2, false, 3);
            assertRollObject(rollObjects[3], 3, false, 4);
            assertRollObject(rollObjects[4], 4, false, 5);
            assertRollObject(rollObjects[5], 5, false, 6);
            assertRollObject(rollObjects[6], 6, false, 1);
        });

        const assertRollObject = (roll, expectedId, shouldBeAssigned, expectedValue) => {
            expect(roll.id).toBe(expectedId);
            expect(roll.assigned).toBe(shouldBeAssigned);
            expect(roll.value).toEqual(expectedValue);
        };
    });
});