import React from 'react';
import {mount, shallow} from 'enzyme';
import sinon from 'sinon';
import ADD2Characters from '../ADD2Characters';
import ADD2CharacterTable from '../ADD2CharacterTable';
import ADD2CharacterDetails from '../ADD2CharacterDetails';
import ADD2CharacterCreation from '../ADD2CharacterCreation';
import ADD2StatRoll from '../ADD2StatRoll';
import RollOnce from '../../StatRollRules/RollOnce';
import ServerGateway from "../../ServerGateway";

describe('ADD2Characters tests', () => {
    it('always renders a top-level div', () => {
        const component = shallow(<ADD2Characters useTestData={true}/>);
        expect(component.find('div').length).toBeGreaterThan(0);
    });

    it('writes to console.error if getting characters from the service fails', () => {
        const xhr = sinon.useFakeXMLHttpRequest();
        const requests = [];
        xhr.onCreate = function(xhr) {
            requests.push(xhr);
        }.bind(this);
        const consoleError = jest.fn();
        console.error = consoleError;
        const component = shallow(<ADD2Characters useTestData={false} serverGateway={new ServerGateway()}/>);
        requests[0].respond(500);

        expect(consoleError).toHaveBeenCalledTimes(1);
        expect(component.state().characterData).toHaveLength(0);
    });

    describe('Creating a new character', () => {
        let component, newCharNameInput, createButton, xhr, requests, consoleError;

        beforeEach(() => {
            component = shallow(<ADD2Characters useTestData={true} testData={[]}/>);
            newCharNameInput = component.find('input');
            createButton = component.find('button').at(0);
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

        it('state is updated when input changes', () => {
            expect(component.state().newCharName).toBe('');
            newCharNameInput.simulate('change', {target: {value: 'something'}});
            expect(component.state().newCharName).toBe('something');
        });

        it('calls handleCreate when enter is pressed', () => {
            newCharNameInput.simulate('change', {target: {value: 'test'}});
            newCharNameInput.simulate('keyPress', {key: 'Enter'});

            expect(component.state().characterData).toHaveLength(1);
            expect(component.state().characterData[0].name).toBe('test');
        });

        it('clears out the text box if trim results in empty string', () => {
            newCharNameInput.simulate('change', {target: {value: '     '}});
            createButton.simulate('click');
            expect(component.state().newCharName).toBe('');
        });

        it('adds a new character to the array if the name is not just spaces', () => {
            expect(component.state().characterData).toHaveLength(0);
            newCharNameInput.simulate('change', {target: {value: 'testName'}});
            createButton.simulate('click');
            expect(component.state().characterData).toHaveLength(1);
            expect(component.state().characterData[0].name).toBe('testName');
        });

        it('gives the first character an id of 1', () => {
            newCharNameInput.simulate('change', {target: {value: 'test'}});
            createButton.simulate('click');
            expect(component.state().characterData[0].id).toBe(1);
        });

        it('gives the second character an id of 2', () => {
            newCharNameInput.simulate('change', {target: {value: 'test1'}});
            createButton.simulate('click');
            newCharNameInput.simulate('change', {target: {value: 'test2'}});
            createButton.simulate('click');
            expect(component.state().characterData[1].id).toBe(2);
        });

        it('calls the service with the expected character data', () => {
            const loadCharsSpy = jest.spyOn(ADD2Characters.prototype, 'loadCharsFromServer');
            const dataJson = JSON.stringify(getTestData());
            component = mount(<ADD2Characters useTestData={false} serverGateway={new ServerGateway()}/>);
            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);

            component.find('input').simulate('change', {target: {value: 'testName'}});
            component.find('button').simulate('click');

            expect(requests[1].url).toEqual(expect.stringMatching(/\/new$/));
            expect(requests[1].method).toEqual('post');
            expect(requests[1].requestBody).toContain('"name":"testName"');
            expect(consoleError).toHaveBeenCalledTimes(0);
            expect(loadCharsSpy).toHaveBeenCalledTimes(1);
        });

        it('does not add new character if the name is a duplicate', () => {
            component = shallow(<ADD2Characters useTestData={true} testData={getTestData()}/>);
            createButton = component.find('button').at(0);
            expect(component.state().characterData).toHaveLength(5);
            component.setState({newCharName: 'Big McLargeHuge'});

            createButton.simulate('click');

            expect(component.state().characterData).toHaveLength(5);
        });

        it('writes to console.error if creating new character fails', () => {
            const dataJson = JSON.stringify(getTestData());
            component = mount(<ADD2Characters useTestData={false} serverGateway={new ServerGateway()}/>);
            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);

            component.find('input').simulate('change', {target: {value: 'errorForSomeReason'}});
            component.find('button').at(0).simulate('click');
            requests[1].respond(500);

            expect(consoleError).toHaveBeenCalledTimes(2);
        });
    });

    describe('Selecting characters', () => {
        it('selects the expected character when none are selected', () => {
            const testChars = [{id: 1, name: 'test1'}];
            const component = mount(<ADD2Characters useTestData={true} testData={testChars}/>);
            component.find(ADD2CharacterTable).find('tbody tr').at(0).simulate('click');

            expect(component.state().selected).not.toBeNull();
            expect(component.state().selected.id).toBe(1);
            expect(component.state().selected.name).toBe('test1');
        });

        it('changes the selection to the expected character', () => {
            const testChars = [{id: 1, name: 'test1'}, {id: 2, name: 'test2'}];
            const component = mount(<ADD2Characters useTestData={true} testData={testChars}/>);
            component.find(ADD2CharacterTable).find('tbody tr').at(0).simulate('click');
            component.find(ADD2CharacterTable).find('tbody tr').at(1).simulate('click');

            expect(component.state().selected).not.toBeNull();
            expect(component.state().selected.id).toBe(2);
            expect(component.state().selected.name).toBe('test2');
        });
    });

    describe('Updating characters', () => {
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

        it('updates the expected character in the collection', () => {
            const testData = getTestData();
            const component = mount(<ADD2Characters useTestData={true} testData={testData}/>);
            component.setState({selected: testData[1]});
            testData[1].str = testData[1].dex = testData[1].con =
                testData[1].int = testData[1].wis = testData[1].chr = 3;
            component.setState({selected: testData[1]});
            const rollOnce = component.find(ADD2CharacterDetails).find(ADD2CharacterCreation).find(ADD2StatRoll).find(RollOnce);
            rollOnce.find('input').at(1).simulate('click');

            const resultData = component.state().characterData;
            expect(resultData[1].str).toBe(3);
            expect(resultData[1].dex).toBe(3);
            expect(resultData[1].con).toBe(3);
            expect(resultData[1].int).toBe(3);
            expect(resultData[1].wis).toBe(3);
            expect(resultData[1].chr).toBe(3);
        });

        it('calls the service with the expected character id and request body', () => {
            const dataJson = JSON.stringify(getTestData());
            const component = mount(<ADD2Characters useTestData={false} serverGateway={new ServerGateway()}/>);
            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
            const charData = component.state().characterData;
            component.setState({selected: charData[1]});

            const rollOnce = component.find(ADD2CharacterDetails).find(ADD2CharacterCreation).find(ADD2StatRoll).find(RollOnce);
            rollOnce.find('input').at(0).simulate('click');
            requests[1].respond(200, {'Content-Type': 'text/json'}, JSON.stringify(getTestRolls()));
            rollOnce.find('input').at(1).simulate('click');

            expect(requests[3].url).toEqual(expect.stringMatching(/\/add2character\/2$/));
            expect(requests[3].method).toEqual('put');
            expect(requests[3].requestBody).toContain('"str":3');
            expect(requests[3].requestBody).toContain('"dex":4');
            expect(requests[3].requestBody).toContain('"con":5');
            expect(requests[3].requestBody).toContain('"int":6');
            expect(requests[3].requestBody).toContain('"wis":7');
            expect(requests[3].requestBody).toContain('"chr":8');
            expect(consoleError).toHaveBeenCalledTimes(0);
        });

        it('writes to console.error if update fails', () => {
            const dataJson = JSON.stringify(getTestData());
            const component = mount(<ADD2Characters useTestData={false} serverGateway={new ServerGateway()}/>);
            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
            const charData = component.state().characterData;
            component.setState({selected: charData[1]});

            const rollOnce = component.find(ADD2CharacterDetails).find(ADD2CharacterCreation).find(ADD2StatRoll).find(RollOnce);
            rollOnce.find('input').at(0).simulate('click');
            requests[1].respond(200, {'Content-Type': 'text/json'}, JSON.stringify(getTestRolls()));
            rollOnce.find('input').at(1).simulate('click');
            requests[2].respond(200, {'Content-Type': 'text/json'}, JSON.stringify(['race1', 'race2']));
            requests[3].respond(500);

            expect(consoleError).toHaveBeenCalledTimes(1);
        });

        it('writes to console.error if getRaces fails', () => {
            const dataJson = JSON.stringify(getTestData());
            const component = mount(<ADD2Characters useTestData={false} serverGateway={new ServerGateway()}/>);
            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
            const charData = component.state().characterData;
            component.setState({selected: charData[1]});

            const rollOnce = component.find(ADD2CharacterDetails).find(ADD2CharacterCreation).find(ADD2StatRoll).find(RollOnce);
            rollOnce.find('input').at(0).simulate('click');
            requests[1].respond(200, {'Content-Type': 'text/json'}, JSON.stringify(getTestRolls()));
            rollOnce.find('input').at(1).simulate('click');
            requests[2].respond(500);

            expect(consoleError).toHaveBeenCalledTimes(1);
        });

        const getTestRolls = () => {
            return [[1, 1, 1], [1, 1, 2], [1, 1, 3], [1, 1, 4], [1, 1, 5], [1, 1, 6]];
        };
    });

    describe('Deleting characters', () => {
        let xhr, requests, consoleError;

        beforeEach(() => {
            consoleError = jest.fn();
            console.error = consoleError;
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function(xhr) {
                requests.push(xhr);
            }.bind(this);
            window.confirm = jest.fn(() => true);
        });
        afterEach(() => {
            xhr.restore();
        });

        it('removes the expected character from the collection', () => {
            let testData = getTestData();
            const component = mount(<ADD2Characters useTestData={true} testData={testData} serverGateway={new ServerGateway()}/>);
            component.setState({selected: testData[0]});
            testData = component.instance().state.characterData;
            expect(testData.length).toBe(5);
            expect(testData[0].id).toBe(1);

            component.find('button').at(2).simulate('click');

            testData = component.instance().state.characterData;
            expect(testData.length).toBe(4);
            expect(testData[0].id).toBe(2);
        });

        it('calls the service with the expected id for deletion', () => {
            const dataJson = JSON.stringify(getTestData());
            const component = mount(<ADD2Characters useTestData={false} serverGateway={new ServerGateway()}/>);
            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
            let charData = component.state().characterData;
            component.setState({selected: charData[0]});
            expect(charData.length).toBe(5);
            expect(charData[0].id).toBe(1);

            component.find('button').at(2).simulate('click');

            expect(requests[1].url).toEqual(expect.stringMatching(/\/add2character\/1$/));
            expect(requests[1].method).toEqual('delete');
            charData = component.instance().state.characterData;
            expect(charData.length).toBe(4);
            expect(charData[0].id).toBe(2);
            expect(consoleError).toHaveBeenCalledTimes(0);
        });

        it('writes to console error if delete fails', () => {
            const dataJson = JSON.stringify(getTestData());
            const component = mount(<ADD2Characters useTestData={false} serverGateway={new ServerGateway()}/>);
            requests[0].respond(200, {'Content-Type': 'text/json'}, dataJson);
            let charData = component.state().characterData;
            component.setState({selected: charData[0]});

            component.find('button').at(2).simulate('click');
            requests[1].respond(500);

            expect(consoleError).toHaveBeenCalledTimes(1);
        });
    });

    const getTestData = () => {
        return [
            {
                id: 1,
                name: 'Big McLargeHuge',
                completionStep: 2,
                str: 18,
                dex: 14,
                con: 9,
                int: 16,
                wis: 11,
                chr: 12,
                race: 'Elf',
                gender: 'M',
                height: 60,
                weight: 110,
                age: 110,
                className: 'Fighter',
                alignment: 'Lawful Good',
                paralyze: 14,
                rod: 16,
                petrification: 15,
                breath: 17,
                spell: 17,
                hp: 9,
                moveRate: 12,
                funds: 170,
                availableRaces: []
            },
            {
                id: 2,
                name: 'Gristle McThornbody',
                completionStep: 1,
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                chr: 0,
                race: 'none',
                gender: 'n',
                height: 0,
                weight: 0,
                age: 0,
                className: 'none',
                alignment: 'none',
                paralyze: 0,
                rod: 0,
                petrification: 0,
                breath: 0,
                spell: 0,
                hp: 0,
                moveRate: 0,
                funds: 0,
                availableRaces: []
            },
            {
                id: 3,
                name: 'Crunch Bonemeal',
                completionStep: 1,
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                chr: 0,
                race: 'none',
                gender: 'n',
                height: 0,
                weight: 0,
                age: 0,
                className: 'none',
                alignment: 'none',
                paralyze: 0,
                rod: 0,
                petrification: 0,
                breath: 0,
                spell: 0,
                hp: 0,
                moveRate: 0,
                funds: 0
            },
            {
                id: 4,
                name: 'Rip Steakface',
                completionStep: 3,
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                chr: 0,
                race: 'none',
                gender: 'n',
                height: 0,
                weight: 0,
                age: 0,
                availableClasses: [],
                className: 'none',
                alignment: 'none',
                paralyze: 0,
                rod: 0,
                petrification: 0,
                breath: 0,
                spell: 0,
                hp: 0,
                moveRate: 0,
                funds: 0
            },
            {
                id: 5,
                name: 'Swift McRunfast',
                completionStep: 3,
                str: 12,
                dex: 12,
                con: 10,
                int: 18,
                wis: 7,
                chr: 15,
                race: 'Human',
                gender: 'F',
                height: 65,
                weight: 110,
                age: 18,
                availableClasses: [],
                className: 'Mage',
                alignment: 'Neutral Good',
                paralyze: 14,
                rod: 11,
                petrification: 13,
                breath: 15,
                spell: 12,
                hp: 4,
                moveRate: 12,
                funds: 50
            }
        ];
    };
});