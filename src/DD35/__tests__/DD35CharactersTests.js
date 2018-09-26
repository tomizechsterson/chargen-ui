import React from 'react';
import {shallow} from 'enzyme';
import DD35Characters from '../DD35Characters';
import DD35CharacterTable from "../DD35CharacterTable";

describe('DD35Characters Tests', () => {
    it('Renders the table when initially loaded', () => {
        const component = shallow(<DD35Characters/>);
        expect(component.find(DD35CharacterTable)).toHaveLength(1);
    });
});
