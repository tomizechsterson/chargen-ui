import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import RollOnce from '../RollOnce';

describe('RollOnce tests', () => {
    it('renders a top-level div tag', () => {
        const component = shallow(<RollOnce/>);
        expect(component.find('div')).toHaveLength(1);
    });

    describe('Save Stats button', () => {
        it('if there are no rolls, onUpdate is not called', () => {
            const updateFunc = jest.fn();
            const component = shallow(<RollOnce onUpdate={updateFunc}/>);
            component.setState({rolls: []});

            component.find('input').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if there are rolls, onUpdate is called once and completionStep is incremented', () => {
            const updateFunc = jest.fn();
            const testChar = {completionStep: 0};
            const component = shallow(<RollOnce selectedChar={testChar} onUpdate={updateFunc}/>);
            component.setState({rolls: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]});

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
            const component = shallow(<RollOnce selectedChar={{id: 1}}/>);
            const data = [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]];
            const dataJson = JSON.stringify(data);

            component.find('input').at(0).simulate('click');

            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
            expect(component.state().selectedChar.id).toBe(1);
            expect(component.state().selectedChar.str).toBe(3);
            expect(component.state().selectedChar.dex).toBe(4);
            expect(component.state().selectedChar.con).toBe(5);
            expect(component.state().selectedChar.int).toBe(6);
            expect(component.state().selectedChar.wis).toBe(7);
            expect(component.state().selectedChar.chr).toBe(8);
            expect(component.state().rolls).toEqual([[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]]);
            xhr.restore();
        });
    });
});