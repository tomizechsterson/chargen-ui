import React from 'react';
import {shallow} from 'enzyme';
import SelectorADD2 from '../GameSelection/SelectorADD2';
import ADD2Characters from "../ADD2/ADD2Characters";

describe('SelectorADD2 Tests', () => {
    it('renders the expected div and component', () => {
        const component = shallow(<SelectorADD2/>);
        expect(component.find('div')).toHaveLength(1);
        expect(component.find(ADD2Characters)).toHaveLength(1);
    });
});