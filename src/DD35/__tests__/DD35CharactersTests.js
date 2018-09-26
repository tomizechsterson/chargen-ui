import React from 'react';
import {shallow} from 'enzyme';
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
