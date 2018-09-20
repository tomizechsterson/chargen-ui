import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import RollTwice from '../RollTwice';
import ServerGateway from "../../ServerGateway";

describe('RollTwice tests', () => {
    it('renders a top-level div', () => {
        const component = shallow(<RollTwice/>);
        expect(component.find('div')).toHaveLength(1);
    });

    describe('Save Stats button', () => {
        it('if there are no rolls, onUpdate is not called', () => {
            const updateFunc = jest.fn();
            const component = shallow(<RollTwice onUpdate={updateFunc}/>);
            component.setState({rolls: []});

            component.find('input').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if there are rolls, onUpdate is called once and completionStep is incremented', () => {
            const updateFunc = jest.fn();
            const testChar = {completionStep: 0};
            const component = shallow(<RollTwice selectedChar={testChar} onUpdate={updateFunc}/>);
            component.setState({rolls: [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
                    [2, 3, 3], [2, 2, 3], [2, 2, 2], [1, 2, 2], [1, 1, 2], [1, 1, 1]]});

            component.find('input').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
            expect(updateFunc).toHaveBeenCalledWith({completionStep: 1});
        });
    });

    describe('Roll Stats button', () => {
        let xhr, requests, consoleError;
        beforeEach(() => {
            consoleError = jest.fn();
            console.error = consoleError;
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function(xhr) {
                requests.push(xhr);
            }.bind(this);
        });
        afterEach(() => {
            xhr.restore();
        });

        it('sets state appropriately with return value of request', () => {
            const component = shallow(<RollTwice selectedChar={{id: 1}} gateway={new ServerGateway()}/>);
            const data = [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
                [2, 3, 3], [2, 2, 3], [2, 2, 2], [1, 2, 2], [1, 1, 2], [1, 1, 1]];
            const dataJson = JSON.stringify(data);

            component.find('input').at(0).simulate('click');

            requests[0].respond(200, {'Content-Type': 'application/json'}, dataJson);
            expect(component.state().selectedChar.id).toBe(1);
            expect(component.state().selectedChar.str).toBe(4);
            expect(component.state().selectedChar.dex).toBe(6);
            expect(component.state().selectedChar.con).toBe(8);
            expect(component.state().selectedChar.int).toBe(8);
            expect(component.state().selectedChar.wis).toBe(6);
            expect(component.state().selectedChar.chr).toBe(4);
            expect(component.state().rolls).toEqual([[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
                [2, 3, 3], [2, 2, 3], [2, 2, 2], [1, 2, 2], [1, 1, 2], [1, 1, 1]]);
        });

        it('writes to console.error if rollTwice server call fails', () => {
            const component = shallow(<RollTwice gateway={new ServerGateway()}/>);

            component.find('input').at(0).simulate('click');
            requests[0].respond(500, '', 'test rollTwice error');

            expect(consoleError).toHaveBeenCalledTimes(1);
            expect(consoleError).toHaveBeenCalledWith('test rollTwice error');
        });
    });
});