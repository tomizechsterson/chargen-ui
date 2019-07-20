import React from 'react';
import {shallow} from 'enzyme';
import RollOnce from '../RollOnce';

describe('RollOnce tests', () => {
    describe('Save Stats button', () => {
        it('if there are no rolls, onUpdate is not called', () => {
            window.alert = jest.fn();
            const updateFunc = jest.fn();
            const component = shallow(<RollOnce onUpdate={updateFunc}/>);
            component.setState({rolls: []});

            component.find('button').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if there are rolls, onUpdate is called once and completionStep is incremented', () => {
            const updateFunc = jest.fn();
            const testChar = {completionStep: 0};
            const component = shallow(<RollOnce selectedChar={testChar} onUpdate={updateFunc}/>);
            component.setState({rolls: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]});

            component.find('button').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
            expect(updateFunc).toHaveBeenCalledWith({completionStep: 1});
        });
    });

    describe('Roll Stats Button', () => {
        let component;
        function mockGateway() {return {
            rollStats: () => {return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]]}
        }}
        function tick() {
            return new Promise(resolve => {setTimeout(resolve, 0)});
        }
        beforeEach(() => {
            component = shallow(<RollOnce selectedChar={{id: 1}} gateway={mockGateway()} />);
        });

        it('sets state appropriately with return value of request', async () => {
            component.find('button').at(0).simulate('click');
            await tick();

            expect(component.state().selectedChar.str).toBe(3);
            expect(component.state().selectedChar.dex).toBe(4);
            expect(component.state().selectedChar.con).toBe(5);
            expect(component.state().selectedChar.int).toBe(6);
            expect(component.state().selectedChar.wis).toBe(7);
            expect(component.state().selectedChar.chr).toBe(8);
            expect(component.state().rolls).toEqual([[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]]);
        });
    });
});
