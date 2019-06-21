import React from 'react';
import {shallow} from 'enzyme';
import SelectorHome from '../GameSelection/SelectorHome';

describe('SelectorHome Tests', () => {
    it('renders the expected top-level div and component', () => {
        const component = shallow(<SelectorHome/>);
        expect(component.find('div')).toHaveLength(1);
        expect(component.find('p')).toHaveLength(1);
    });
});