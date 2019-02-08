import React from 'react';
import {shallow} from 'enzyme';
import RollFour from '../RollFour';
describe('RollFour tests placeholder', () => {
    it('does nothing', () => {

    });
});
/*describe('RollFour tests', () => {
    describe('Save Stats button', () => {
        it('does not call onUpdate if there are no rolls', () => {
            const updateFunc = jest.fn();
            const component = shallow(<RollFour onUpdate={updateFunc}/>);
            component.setState({rolls: []});

            component.find('input').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('calls onUpdate once and increments completion step, if there are rolls', () => {
            const updateFunc = jest.fn();
            const testChar = {completionStep: 0};
            const component = shallow(<RollFour selectedChar={testChar} onUpdate={updateFunc}/>);
            component.setState({rolls: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]});

            component.find('input').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
            expect(updateFunc).toHaveBeenCalledWith({completionStep: 1});
        });
    });

    describe('Roll Stats button', () => {
        let component;
        function mockGateway() {return {
            rollStats: () => {return [[1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 1, 3], [1, 1, 1, 4], [1, 1, 1, 5], [1, 1, 1, 6]]}
        }}
        function tick() {
            return new Promise(resolve => {setTimeout(resolve, 0)});
        }
        beforeEach(() => {
            component = shallow(<RollFour selectedChar={{id: 1}} gateway={mockGateway()}/>);
        });

        it('sets state appropriately with return value of request', async () => {
            component.find('input').at(0).simulate('click');
            await tick();

            expect(component.state().selectedChar.id).toBe(1);
            expect(component.state().selectedChar.str).toBe(3);
            expect(component.state().selectedChar.dex).toBe(4);
            expect(component.state().selectedChar.con).toBe(5);
            expect(component.state().selectedChar.int).toBe(6);
            expect(component.state().selectedChar.wis).toBe(7);
            expect(component.state().selectedChar.chr).toBe(8);
            expect(component.state().rolls).toEqual([[1, 1, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [4, 1, 1, 1], [5, 1, 1, 1], [6, 1, 1, 1]]);
        });
    });
});*/