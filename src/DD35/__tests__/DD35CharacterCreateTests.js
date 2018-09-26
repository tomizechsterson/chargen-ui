import React from 'react';
import {shallow} from 'enzyme';
import DD35CharacterCreate from "../DD35CharacterCreate";

describe('DD35 Character Create tests', () => {
    it('Renders', () => {
        const component = shallow(<DD35CharacterCreate/>);
        expect(component.text()).toContain('Character creation');
    });
});