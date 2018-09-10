import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import RollFour from '../RollFour';
import ServerGateway from "../../ServerGateway";

describe('RollFour tests', () => {
    it('renders the top-level div', () => {
        const component = shallow(<RollFour/>);
        expect(component.find('div')).toHaveLength(1);
    });

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
            const component = shallow(<RollFour selectedChar={{id: 1}} gateway={new ServerGateway()}/>);
            const data = [[1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 1, 3], [1, 1, 1, 4], [1, 1, 1, 5], [1, 1, 1, 6]];
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
            expect(component.state().rolls).toEqual([[1, 1, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [4, 1, 1, 1], [5, 1, 1, 1], [6, 1, 1, 1]]);
        });

        it('writes to console.error if rollFour server call fails', () => {
            const component = shallow(<RollFour gateway={new ServerGateway()}/>);

            component.find('input').at(0).simulate('click');
            requests[0].respond(500, '', 'test rollFour error');

            expect(consoleError).toHaveBeenCalledTimes(1);
            expect(consoleError).toHaveBeenCalledWith('test rollFour error');
        });
    });
});