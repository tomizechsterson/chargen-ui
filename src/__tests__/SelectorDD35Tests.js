import React from 'react';
import {shallow} from 'enzyme';
import SelectorDD35 from '../SelectorDD35';

describe('SelectorDD35 Tests', () => {
    it('renders the expected top-level div and component', () => {
        const component = shallow(<SelectorDD35/>);
        expect(component.find('div')).toHaveLength(1);
        expect(component.find('p')).toHaveLength(1);
    });
});