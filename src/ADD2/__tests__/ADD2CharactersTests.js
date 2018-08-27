import React from 'react';
import {mount, shallow} from 'enzyme';
import ADD2Characters from "../ADD2Characters";
import ADD2CharacterTable from "../ADD2CharacterTable";

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
});