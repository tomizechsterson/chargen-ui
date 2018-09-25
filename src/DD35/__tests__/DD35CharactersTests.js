import React from 'react';
import {shallow} from 'enzyme';
import DD35Characters from '../DD35Characters';

describe('DD35Characters Tests', () => {
    it('Renders without crashing', () => {
        const component = shallow(<DD35Characters/>);
        expect(component.text()).toContain('D&D 3.5 characters');
    });
});
