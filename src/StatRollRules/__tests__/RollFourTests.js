import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import RollFour from '../RollFour';

describe('RollFour tests', () => {
    it('renders the top-level div', () => {
        const component = shallow(<RollFour/>);
        expect(component.find('div')).toHaveLength(1);
    });

    describe('Save Stats button', () => {
        it('if rolls are not defined, onUpdate is not called', () => {
            const updateFunc = jest.fn();
            const component = shallow(<RollFour onUpdate={updateFunc}/>);
            component.setState({rolls: []});
            const saveButton = component.find('input').at(1);

            saveButton.simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if rolls are defined, onUpdate is called once and completionStep is incremented', () => {
            const updateFunc = jest.fn();
            const testChar = {completionStep: 0};
            const component = shallow(<RollFour selectedChar={testChar} onUpdate={updateFunc}/>);
            component.setState({rolls: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]});
            const saveButton = component.find('input').at(1);

            saveButton.simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
            expect(component.instance().props.selectedChar.completionStep).toBe(1);
        });
    });

    describe('Roll Stats button', () => {
        it('sets state appropriately with return value of request', () => {
            const xhr = sinon.useFakeXMLHttpRequest();
            const requests = [];
            xhr.onCreate = function(xhr) {
                requests.push(xhr);
            }.bind(this);
            const component = shallow(<RollFour selectedChar={{id: 1}}/>);
            const rollButton = component.find('input').at(0);
            const data = [[1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 1, 3], [1, 1, 1, 4], [1, 1, 1, 5], [1, 1, 1, 6]];
            const dataJson = JSON.stringify(data);

            rollButton.simulate('click');

            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
            expect(component.state().selectedChar.id).toBe(1);
            expect(component.state().selectedChar.str).toBe(3);
            expect(component.state().selectedChar.dex).toBe(4);
            expect(component.state().selectedChar.con).toBe(5);
            expect(component.state().selectedChar.int).toBe(6);
            expect(component.state().selectedChar.wis).toBe(7);
            expect(component.state().selectedChar.chr).toBe(8);
            expect(component.state().rolls).toEqual([[1, 1, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [4, 1, 1, 1], [5, 1, 1, 1], [6, 1, 1, 1]]);
            xhr.restore();
        });
    });
});