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
    function mockGateway() {
        return {get: () => {return []}}
    }

    it('sets the selected character when clicking a button on the table', () => {
        const component = mount(<DD35Characters gateway={mockGateway()}/>);
        expect(component.state().selectedChar).toBeUndefined();
        const table = component.find(DD35CharacterTable);

        table.props().onSelect({id: 1, name: 'test'});

        expect(component.state().selectedChar).toEqual({id: 1, name: 'test'});
    });

    it('clears the selected character when clicking the close button in Create component', () => {
        const component = mount(<DD35Characters gateway={mockGateway()}/>);
        component.setState({selectedChar: {id: 1, name: 'test'}});
        expect(component.state().selectedChar).toEqual({id: 1, name: 'test'});
        const createComponent = component.find(DD35CharacterCreate);

        createComponent.props().onClose();

        expect(component.state().selectedChar).toBeUndefined();
    });
});