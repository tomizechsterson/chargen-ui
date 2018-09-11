import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ADD2RaceSelection from '../ADD2RaceSelection';
import ServerGateway from "../../ServerGateway";

describe('ADD2RaceSelection tests', () => {
    it('renders the available races', () => {
        const testChar = {availableRaces: ['race1', 'race2']};
        const component = shallow(<ADD2RaceSelection selectedChar={testChar} gateway={new ServerGateway()}/>);

        expect(component.text()).toContain('race1');
        expect(component.text()).toContain('race2');
    });

    it('renders a save button', () => {
        const component = shallow(<ADD2RaceSelection selectedChar={{availableRaces:[]}}/>);

        expect(component.find('button')).toHaveLength(1);
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
            requests[0].respond(200, {'Content-Type': 'text/json'}, JSON.stringify({"int": 1, "wis": -1}));

            expect(component.instance().state.adjustments.int).toEqual(1);
            expect(component.instance().state.adjustments.wis).toEqual(-1);
        });
    });

    describe('Save Button', () => {
        let updateFunc, component;
        beforeEach(() => {
            updateFunc = jest.fn();
            component = shallow(<ADD2RaceSelection onUpdate={updateFunc} selectedChar={{completionStep: 2, availableRaces: []}}/>);
        });

        it('does not call onUpdate if no race is selected', () => {
            component.find('button').at(0).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('calls onUpdate once with the expected race and increments completionStep', () => {
            component.setState({selectedRace: 'testRace'});

            component.find('button').at(0).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
            expect(updateFunc).toHaveBeenCalledWith({availableRaces: [], completionStep: 3, race: 'testRace'});
        });
    });
});