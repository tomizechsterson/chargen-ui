import React from 'react';
import {shallow, mount} from 'enzyme';
import ADD2Characters from '../ADD2Characters';
import RollOnce from "../../StatRollRules/RollOnce";
import ADD2CharacterDetails from "../ADD2CharacterDetails";
import ADD2CharacterCreation from "../ADD2CharacterCreation";
import ADD2StatRoll from "../ADD2StatRoll";
import ADD2CharacterTable from "../ADD2CharacterTable";

describe('ADD2Characters tests', () => {
    function baseMockGateway() {return {getCharacters: () => {return []}}}
    it('only renders one button (create) if no character is selected', () => {
        const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()} />);
        expect(component.find('button').length).toBe(1);
    });

    it('renders two buttons (create and delete) if a character is selected', () => {
        const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()} />);
        component.setState({selected: {}});
        expect(component.find('button').length).toBe(2);
    });

    describe('Creating Characters', () => {
        it('adds a character to state with id 1 when collection starts empty', () => {
            const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()}/>);
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
        it('updates state properly', () => {
            const testData = getTestData();
            const component = mount(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()}/>);
            component.setState({characterData: testData, selected: testData[0]});
            testData[0].str = testData[0].dex = testData[0].con = testData[0].int = testData[0].wis = testData[0].chr = 3;
            component.setState({selected: testData[0]});
            const table = component.find(ADD2CharacterTable);
            table.find('tbody tr').at(0).simulate('click');
//            expect(component.text()).toBe('blah');
//            const rollOnce = component.find(ADD2CharacterDetails).find(ADD2CharacterCreation).find(ADD2StatRoll).find(RollOnce);
//            const saveButton = rollOnce.find('button').at(1);
//            saveButton.simulate('click');
        });
    });

    describe('Deleting Characters', () => {
        it('Removes from state', () => {
            const testData = getTestData();
            window.confirm = jest.fn(() => true);
            const component = shallow(<ADD2Characters useTestData={true} serverGateway={baseMockGateway()}/>);
            component.setState({characterData: testData, selected: testData[0]});
            const deleteButton = component.find('button').at(1);
            expect(component.state().characterData).toHaveLength(3);
            deleteButton.simulate('click');

            expect(component.state().characterData).toHaveLength(2);
        });
    });

    const getTestData = () => {
        return [
            {id: 1, name: 'test1'},
            {id: 2, name: 'test2'},
            {id: 3, name: 'test3'}
        ];
    }
});