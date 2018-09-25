import React from 'react';
import {shallow} from 'enzyme';
import SelectorDD35 from '../SelectorDD35';
import DD35Characters from "../DD35/DD35Characters";

describe('SelectorDD35 Tests', () => {
    it('renders a DD35Characters component', () => {
        const component = shallow(<SelectorDD35/>);
        expect(component.find(DD35Characters)).toHaveLength(1);
    });
});