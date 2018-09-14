import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import ADD2FinalAttributes from '../ADD2FinalAttributes';
import ServerGateway from "../../ServerGateway";

describe('ADD2 Final Attributes Tests', () => {
    it('renders stats of selected character', () => {
        const testChar = {str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8};
        const component = shallow(<ADD2FinalAttributes selectedChar={testChar}/>);
        expect(component.text()).toContain('STR: 3');
        expect(component.text()).toContain('DEX: 4');
        expect(component.text()).toContain('CON: 5');
        expect(component.text()).toContain('INT: 6');
        expect(component.text()).toContain('WIS: 7');
        expect(component.text()).toContain('CHR: 8');
    });

    it('renders the rest of the attributes of the selected character', () => {
        const testChar = {race: 'testRace', gender: 'F', className: 'testClass', alignment: 'testAlignment'};
        const component = shallow(<ADD2FinalAttributes selectedChar={testChar}/>);
        expect(component.text()).toContain('Race: testRace');
        expect(component.text()).toContain('Gender: F');
        expect(component.text()).toContain('Class: testClass');
        expect(component.text()).toContain('Alignment: testAlignment');
    });

    it('renders height, weight, age, initial funds, and HP from state', () => {
        const component = shallow(<ADD2FinalAttributes selectedChar={{}}/>);
        component.setState({height: 67, weight: 120, age: 25, hp: 10, funds: 120});
        expect(component.text()).toContain('Height: 5\'7"');
        expect(component.text()).toContain('Weight: 120');
        expect(component.text()).toContain('Age: 25');
        expect(component.text()).toContain('HP: 10');
        expect(component.text()).toContain('Funds: 120 gp');
    });

    describe('Roll Vitals Buttons', () => {
        let xhr, requests, consoleError, component;
        beforeEach(() => {
            consoleError = jest.fn();
            console.error = consoleError;
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function(xhr) {
                requests.push(xhr);
            }.bind(this);
            component = shallow(<ADD2FinalAttributes selectedChar={{}} gateway={new ServerGateway()}/>);
        });
        afterEach(() => {
            xhr.restore();
        });

        it('HWA button updates the height, weight, and age of the selected character', () => {
            component.find('button').at(0).simulate('click');
            requests[0].respond(200, {'Content-Type': 'text/json'}, JSON.stringify([70, 150, 25]));

            expect(component.state().height).toBe(70);
            expect(component.state().weight).toBe(150);
            expect(component.state().age).toBe(25);
        });

        it('HWA button writes to console.error if getting height/weight/age fails', () => {
            component.find('button').at(0).simulate('click');
            requests[0].respond(500, '', 'test hwa error');

            assertError(consoleError, 'test hwa error');
        });

        it('Hp/Gp button updates the HP and starting funds of the selected character', () => {
            component.find('button').at(1).simulate('click');
            requests[0].respond(200, {'Content-Type': 'text/json'}, JSON.stringify([7, 90]));

            expect(component.state().hp).toBe(7);
            expect(component.state().funds).toBe(90);
        });

        it('Hp/Gp button writes to console.error if getting hp/initial funds fails', () => {
            component.find('button').at(1).simulate('click');
            requests[0].respond(500, '', 'test hpgp error');

            assertError(consoleError, 'test hpgp error');
        });

        const assertError = (consoleErr, errorMsg) => {
            expect(consoleErr).toHaveBeenCalledTimes(1);
            expect(consoleErr).toHaveBeenCalledWith(errorMsg);
        };
    });
});