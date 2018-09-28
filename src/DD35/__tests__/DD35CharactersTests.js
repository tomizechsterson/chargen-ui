import React from 'react';
import {shallow, mount} from 'enzyme';
import DD35Characters from '../DD35Characters';
import DD35CharacterTable from "../DD35CharacterTable";
import DD35CharacterCreate from "../DD35CharacterCreate";

describe('DD35Characters Tests', () => {
    let component;
    beforeEach(() => {
        component = shallow(<DD35Characters/>);
    });

    it('Renders the table when initially loaded', () => {
        expect(component.find(DD35CharacterTable)).toHaveLength(1);
    });

    it('Renders the create component if a character is selected', () => {
        component.setState({selectedChar: {id: 1}});
        expect(component.find(DD35CharacterCreate)).toHaveLength(1);
    });

    it('Renders the table when selected character is cleared', () => {
        component.setState({selectedChar: {id: 1}});
        expect(component.find(DD35CharacterCreate)).toHaveLength(1);
        component.setState({selectedChar: undefined});
        expect(component.find(DD35CharacterTable)).toHaveLength(1);
    });
});

describe('DD35Characters Integration Tests', () => {
    it('sets the selected character when clicking a button on the table', () => {
        const component = mount(<DD35Characters/>);
        expect(component.state().selectedChar).toBeUndefined();
        const table = component.find(DD35CharacterTable);
        table.find('input').simulate('change', {target: {value: 'test'}});
        table.find('button').at(0).simulate('click');

        expect(table.find('tbody tr')).toHaveLength(1);

        expect(component.state().selectedChar).toBe({id: 1, name: 'test'});
    });
});