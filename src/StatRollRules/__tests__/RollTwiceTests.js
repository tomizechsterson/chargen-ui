import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import RollTwice from '../RollTwice';

describe('RollTwice tests', () => {
    it('renders a top-level div', () => {
        const component = shallow(<RollTwice/>);
        expect(component.find('div')).toHaveLength(1);
    });

    describe('Save Stats button', () => {
        it('if rolls are not defined, onUpdate is not called', () => {
            const updateFunc = jest.fn();
            const component = shallow(<RollTwice onUpdate={updateFunc}/>);
            component.setState({rolls: []});

            component.find('input').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if rolls are defined, onUpdate is called once and completionStep is incremented', () => {
            const updateFunc = jest.fn();
            const testChar = {completionStep: 0};
            const component = shallow(<RollTwice selectedChar={testChar} onUpdate={updateFunc}/>);
            component.setState({rolls: [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
                    [2, 3, 3], [2, 2, 3], [2, 2, 2], [1, 2, 2], [1, 1, 2], [1, 1, 1]]});

            component.find('input').at(1).simulate('click');

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
            const component = shallow(<RollTwice selectedChar={{id: 1}}/>);
            const data = [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
                [2, 3, 3], [2, 2, 3], [2, 2, 2], [1, 2, 2], [1, 1, 2], [1, 1, 1]];
            const dataJson = JSON.stringify(data);

            component.find('input').at(0).simulate('click');

            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
            expect(component.state().selectedChar.id).toBe(1);
            expect(component.state().selectedChar.str).toBe(4);
            expect(component.state().selectedChar.dex).toBe(6);
            expect(component.state().selectedChar.con).toBe(8);
            expect(component.state().selectedChar.int).toBe(8);
            expect(component.state().selectedChar.wis).toBe(6);
            expect(component.state().selectedChar.chr).toBe(4);
            expect(component.state().rolls).toEqual([[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
                [2, 3, 3], [2, 2, 3], [2, 2, 2], [1, 2, 2], [1, 1, 2], [1, 1, 1]]);
            xhr.restore();
        });
    });
});