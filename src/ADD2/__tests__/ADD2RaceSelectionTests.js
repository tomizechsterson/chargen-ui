import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ADD2RaceSelection from '../ADD2RaceSelection';
import ServerGateway from "../../ServerGateway";

describe('ADD2RaceSelection tests', () => {
    it('renders the stats of the selected character', () => {
        const testChar = {id: 1, str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8, availableRaces: []};
        const component = shallow(<ADD2RaceSelection selectedChar={testChar} gateway={new ServerGateway()}/>);

        expect(component.text()).toContain('STR: 3');
        expect(component.text()).toContain('DEX: 4');
        expect(component.text()).toContain('CON: 5');
        expect(component.text()).toContain('INT: 6');
        expect(component.text()).toContain('WIS: 7');
        expect(component.text()).toContain('CHR: 8');
    });

    it('renders the available races', () => {
        const testChar = {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3, availableRaces: ['race1', 'race2']};
        const component = shallow(<ADD2RaceSelection selectedChar={testChar} gateway={new ServerGateway()}/>);

        expect(component.text()).toContain('race1');
        expect(component.text()).toContain('race2');
    });

    it('renders a save button', () => {
        const component = shallow(<ADD2RaceSelection selectedChar={{availableRaces:[]}}/>);

        expect(component.find('button')).toHaveLength(1);
    });

    describe('Race Drop Down', () => {
        it('changes state to selected race', () => {
            const component = shallow(<ADD2RaceSelection gateway={new ServerGateway()} selectedChar={{availableRaces: []}}/>);
            const raceDropDown = component.find('select');

            raceDropDown.simulate('change', {target: {value: 'test1'}});
            expect(component.state().selectedRace).toBe('test1');
        });

        it('gets stat adjustments for selected race', () => {
            const xhr = sinon.useFakeXMLHttpRequest();
            const requests = [];
            xhr.onCreate = function(xhr) {
                requests.push(xhr);
            }.bind(this);
            const component = shallow(<ADD2RaceSelection gateway={new ServerGateway()} selectedChar={{availableRaces: []}}/>);
            const raceDropDown = component.find('select');

            raceDropDown.simulate('change', {target: {value: 'testRace'}});
            requests[0].respond(200, {'Content-Type': 'text/json'}, JSON.stringify({"int": 1, "wis": -1}));

            expect(component.instance().state.adjustments.int).toEqual(1);
            expect(component.instance().state.adjustments.wis).toEqual(-1);

            xhr.restore();
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