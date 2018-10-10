import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ADD2RaceSelection from '../ADD2RaceSelection';
import ServerGateway from "../../ServerGateway";

describe('ADD2RaceSelection tests', () => {
    it('renders the available races', () => {
        const testChar = {availableRaces: ['race1', 'race2']};
        const component = shallow(<ADD2RaceSelection selectedChar={testChar}/>);

        expect(component.text()).toContain('race1');
        expect(component.text()).toContain('race2');
    });

    describe('Race Drop Down', () => {
        let xhr, requests;
        beforeEach(() => {
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function(xhr) {
                requests.push(xhr);
            }.bind(this);
        });
        afterEach(() => {
            xhr.restore();
        });

        it('changes state to selected race', () => {
            const component = shallow(<ADD2RaceSelection gateway={new ServerGateway()} selectedChar={{availableRaces: []}}/>);
            const raceDropDown = component.find('select');

            raceDropDown.simulate('change', {target: {value: 'test1'}});
            expect(component.state().selectedRace).toBe('test1');
        });

        it('writes to console if getting stat adjustments fails', () => {
            const consoleError = jest.fn();
            console.error = consoleError;
            const component = shallow(<ADD2RaceSelection gateway={new ServerGateway()} selectedChar={{availableRaces: []}}/>);
            const raceDropDown = component.find('select');

            raceDropDown.simulate('change', {target: {value: 'something'}});
            requests[0].respond(500);

            expect(consoleError).toHaveBeenCalledTimes(1);
        });

        it('gets stat adjustments for selected race', () => {
            const component = shallow(<ADD2RaceSelection gateway={new ServerGateway()} selectedChar={{availableRaces: []}}/>);
            const raceDropDown = component.find('select');

            raceDropDown.simulate('change', {target: {value: 'testRace'}});
            requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify([{'key': 'int', 'value': 1}, {'key': 'wis', 'value': -1}]));

            expect(component.instance().state.adjustments[0].value).toEqual(1);
            expect(component.instance().state.adjustments[1].value).toEqual(-1);
        });
    });

    describe('Save Button', () => {
        let updateFunc, component;
        beforeEach(() => {
            updateFunc = jest.fn();
            component = shallow(<ADD2RaceSelection onUpdate={updateFunc} selectedChar={{completionStep: 2, str: 4, dex: 4, con: 4, int: 4, wis: 4, chr: 4, availableRaces: []}}/>);
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