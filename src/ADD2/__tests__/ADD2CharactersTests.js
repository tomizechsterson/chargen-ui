import React from 'react';
import {mount, shallow} from 'enzyme';
import ADD2Characters from '../ADD2Characters';
import ADD2CharacterTable from '../ADD2CharacterTable';
import ADD2CharacterDetails from '../ADD2CharacterDetails';
import ADD2CharacterCreation from '../ADD2CharacterCreation';
import ADD2StatRoll from '../ADD2StatRoll';
import RollOnce from '../../StatRollRules/RollOnce';

describe('ADD2Characters tests', () => {
    it('always renders a top-level div', () => {
        const component = shallow(<ADD2Characters useTestData={true}/>);
        expect(component.find('div').length).toBeGreaterThan(0);
    });

    describe('Creating a new character', () => {
        let component, newCharNameInput, createButton;

        beforeEach(() => {
            component = shallow(<ADD2Characters useTestData={true} testData={[]}/>);
            newCharNameInput = component.find('input');
            createButton = component.find('button');
        });

        it('state is updated when input changes', () => {
            newCharNameInput.simulate('change', {target: {value: 'something'}});
            expect(component.state().newCharName).toBe('something');
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
        it('updates the expected character in the collection', () => {
            const testData = getTestData();
            const component = mount(<ADD2Characters useTestData={true} testData={testData}/>);
            component.setState({selected: testData[1]});
            testData[1].str = 3;
            testData[1].dex = 3;
            testData[1].con = 3;
            testData[1].int = 3;
            testData[1].wis = 3;
            testData[1].chr = 3;
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
                    funds: 170
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
                    funds: 0
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
                    id: 5,
                    name: 'Swift McRunfast',
                    completionStep: 2,
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
});