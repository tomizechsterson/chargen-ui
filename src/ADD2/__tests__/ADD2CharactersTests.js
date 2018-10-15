import React from 'react';
import {shallow, mount} from 'enzyme';
import ADD2Characters from '../ADD2Characters';
import RollOnce from "../../StatRollRules/RollOnce";
import ADD2CharacterDetails from "../ADD2CharacterDetails";
import ADD2CharacterCreation from "../ADD2CharacterCreation";
import ADD2StatRoll from "../ADD2StatRoll";
import ADD2CharacterTable from "../ADD2CharacterTable";
import ADD2ClassSelection from "../ADD2ClassSelection";
import ADD2RaceSelection from "../ADD2RaceSelection";

describe('ADD2Characters tests', () => {
    function baseMockGateway() {return {getCharacters: () => {return []}, createCharacter: () => {}, deleteCharacter: () => {}}}
    it('only renders one button (create) if no character is selected', () => {
        const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()} />);
        expect(component.find('button').length).toBe(1);
    });

    it('renders two buttons (create and delete) if a character is selected', () => {
        const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()} />);
        component.setState({selected: {}});
        expect(component.find('button').length).toBe(2);
    });

    describe('Selecting Characters', () => {
        it('selects when none is selected', () => {
            const testData = getTestData();
            const component = mount(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()}/>);
            component.setState({characterData: testData});
            const table = component.find(ADD2CharacterTable);
            table.find('tbody tr').at(0).simulate('click');

            expect(component.state().selected.id).toBe(1);
        });

        it('changes selection', () => {
            const testData = getTestData();
            const component = mount(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()}/>);
            component.setState({characterData: testData, selected: testData[0]});
            expect(component.state().selected.id).toBe(1);

            component.find(ADD2CharacterTable).find('tbody tr').at(2).simulate('click');

            expect(component.state().selected.id).toBe(3);
        });
    });

    describe('Creating Characters', () => {
        it('adds a character to state with id 1 when collection starts empty', () => {
            const component = shallow(<ADD2Characters useTestData={false} serverGateway={baseMockGateway()}/>);
            component.setState({characterData: [], newCharName: 'newChar'});
            const newNameInput = component.find('input');
            newNameInput.simulate('keyPress', {key: 'Enter'});

            expect(component.state().characterData).toHaveLength(1);
        });

        it('adds a character to state with id != 1 when collection already has data', () => {
            const testData = getTestData();
            const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()}/>);
            component.setState({characterData: testData, newCharName: 'newChar'});
            const newNameInput = component.find('input');
            newNameInput.simulate('keyPress', {key: 'Enter'});

            expect(component.state().characterData).toHaveLength(4);
        });

        it('changes state based on changes to the name input', () => {
            const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()}/>);
            const newNameInput = component.find('input');
            newNameInput.simulate('change', {target: {value: 'test'}});

            expect(component.state().newCharName).toBe('test');
        });

        it('sets the name to blank string if it was just spaces', () => {
            const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()}/>);
            const newNameInput = component.find('input');
            newNameInput.simulate('change', {target: {value: '   '}});
            component.find('button').at(0).simulate('click');

            expect(component.state().newCharName).toBe('');
        });
    });

    describe('Updating Characters', () => {
        function mockGateway() {
            return {
                getCharacters: () => {return getTestData()},
                updateCharacter: () => {},
                rollStats: () => {return [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]},
                getRaces: () => {return ['race1', 'race2']},
                getAdjustments: () => {return [{'key': 'str', 'value': 1}, {'key': 'dex', 'value': -1}]},
                getClasses: () => {return ['class1', 'class2']},
                getAlignments: () => {return ['alignment1', 'alignment2']}
            }
        }
        function tick() {
            return new Promise(resolve => {setTimeout(resolve, 0)})
        }

        it('updates state properly for step 1', async () => {
            const testData = getTestData();
            const component = mount(<ADD2Characters useTestData={false} serverGateway={mockGateway()}/>);
            component.setState({characterData: testData, selected: testData[0]});
            const table = component.find(ADD2CharacterTable);
            table.find('tbody tr').at(0).simulate('click');
            const rollOnce = component.find(ADD2CharacterDetails).find(ADD2CharacterCreation).find(ADD2StatRoll).find(RollOnce);
            const rollButton = rollOnce.find('input').at(0);
            const saveButton = rollOnce.find('input').at(1);

            rollButton.simulate('click');
            await tick();
            saveButton.simulate('click');
            await tick();

            expect(component.state().characterData[0].str).toBe(3);
            expect(component.state().characterData[0].dex).toBe(3);
            expect(component.state().characterData[0].con).toBe(3);
            expect(component.state().characterData[0].int).toBe(3);
            expect(component.state().characterData[0].wis).toBe(3);
            expect(component.state().characterData[0].chr).toBe(3);
        });

        it('updates state properly for step 2', async () => {
            const testData = getTestData();
            const component = mount(<ADD2Characters useTestData={false} serverGateway={mockGateway()}/>);
            component.setState({characterData: testData, selected: testData[1]});
            const table = component.find(ADD2CharacterTable);
            table.find('tbody tr').at(1).simulate('click');
            const raceSelection = component.find(ADD2CharacterDetails).find(ADD2CharacterCreation).find(ADD2RaceSelection);
            raceSelection.find('select').simulate('change', {target: {value: 'testRace'}});
            await tick();
            raceSelection.find('input').at(0).simulate('change', {target: {value: 'M'}});
            await tick();

            raceSelection.find('button').at(0).simulate('click');
            await tick();

            expect(component.state().characterData[1].race).toBe('testRace');
        });

        it('updates state properly for step 3', async () => {
            const testData = getTestData();
            const component = mount(<ADD2Characters useTestData={false} serverGateway={mockGateway()}/>);
            component.setState({characterData: testData, selected: testData[2]});
            const table = component.find(ADD2CharacterTable);
            table.find('tbody tr').at(2).simulate('click');
            const classSelection = component.find(ADD2CharacterDetails).find(ADD2CharacterCreation).find(ADD2ClassSelection);
            classSelection.find('select').simulate('change', {target: {value: 'testClass'}});

            classSelection.find('button').at(0).simulate('click');
            await tick();

            expect(component.state().characterData[2].className).toBe('testClass');
        });
    });

    describe('Deleting Characters', () => {
        it('Removes from state', () => {
            const testData = getTestData();
            window.confirm = jest.fn(() => true);
            const component = shallow(<ADD2Characters useTestData={false} serverGateway={baseMockGateway()}/>);
            component.setState({characterData: testData, selected: testData[0]});
            const deleteButton = component.find('button').at(1);
            expect(component.state().characterData).toHaveLength(3);
            deleteButton.simulate('click');

            expect(component.state().characterData).toHaveLength(2);
        });
    });

    const getTestData = () => {
        return [
            {id: 1, name: 'test1', str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0, completionStep: 1},
            {id: 2, name: 'test2', str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0, completionStep: 2},
            {id: 3, name: 'test3', str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0, completionStep: 3}
        ];
    }
});