import React from 'react';
import {shallow} from 'enzyme';
import DD35CharacterTable from "../DD35CharacterTable";

describe('DD35 Character Table Tests', () => {
    it('Renders', () => {
        const component = shallow(<DD35CharacterTable/>);
        expect(component.find('input')).toHaveLength(1);
        expect(component.find('button')).toHaveLength(1);
    });

    describe('Creating New Characters', () => {
        let component, newNameInput, createButton;
        beforeEach(() => {
            component = shallow(<DD35CharacterTable/>);
            newNameInput = component.find('input');
            createButton = component.find('button');
        });

        it('Changes state when the name textbox changes', () => {
            expect(component.state().newCharName).toBe('');
            newNameInput.simulate('change', {target: {value: 'newName'}});

            expect(component.state().newCharName).toBe('newName');
        });

        it('creates new character when enter is pressed', () => {
            newNameInput.simulate('change', {target: {value: 'test'}});
            newNameInput.simulate('keyPress', {key: 'a'});
            newNameInput.simulate('keyPress', {key: 'Enter'});

            expect(component.state().characterData).toHaveLength(1);
            expect(component.state().characterData[0].id).toBe(1);
            expect(component.state().characterData[0].name).toBe('test');
        });

        it('creates a second new character with id 2 (using button)', () => {
            newNameInput.simulate('change', {target: {value: 'char1'}});
            createButton.simulate('click');

            expect(component.state().characterData).toHaveLength(1);
            expect(component.state().characterData[0].id).toBe(1);

            newNameInput.simulate('change', {target: {value: 'char2'}});
            createButton.simulate('click');

            expect(component.state().characterData).toHaveLength(2);
            expect(component.state().characterData[1].id).toBe(2);
        });

        it('does not add a new character if the name is empty', () => {
            newNameInput.simulate('change', {target: {value: '     '}});
            createButton.simulate('click');

            expect(component.state().characterData).toHaveLength(0);
        });

        it('clears out the text box if trim results in empty string', () => {
            newNameInput.simulate('change', {target: {value: '     '}});
            createButton.simulate('click');

            expect(component.state().newCharName).toBe('');
        });

        it('does not add a character if the name is a duplicate', () => {
            newNameInput.simulate('change', {target: {value: 'char1'}});
            createButton.simulate('click');
            newNameInput.simulate('change', {target: {value: 'char1'}});
            createButton.simulate('click');

            expect(component.state().characterData).toHaveLength(1);
        });
    });

    describe('Displaying the table', () => {
        let component;
        beforeEach(() => {
            component = shallow(<DD35CharacterTable/>);
        });

        it('renders a message if there are no characters', () => {
            expect(component.text()).toContain('No characters');
        });

        it('renders the expected number of rows', () => {
            component.setState({characterData: [{id: 1}, {id: 2}]});
            expect(component.find('tbody tr')).toHaveLength(2);
        });

        it('renders buttons for edit and delete', () => {
            component.setState({characterData: [{id: 1}]});
            expect(component.find('tbody tr button')).toHaveLength(2);
        });
    });

    describe('Editing a character', () => {
        it('calls onSelect with the expected character when edit button is clicked', () => {
            const selectFn = jest.fn();
            const component = shallow(<DD35CharacterTable onSelect={selectFn}/>);
            component.setState({characterData: [{id: 1, name: 'test1'}, {id: 2, name: 'test2'}]});
            const characterRows = component.find('tbody tr');

            characterRows.at(0).find('button').at(0).simulate('click');
            expect(selectFn).toHaveBeenCalledWith({id: 1, name: 'test1'});

            characterRows.at(1).find('button').at(0).simulate('click');
            expect(selectFn).toHaveBeenCalledWith({id: 2, name: 'test2'});
        });
    });
});