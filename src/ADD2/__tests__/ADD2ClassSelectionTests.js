import React from 'react';
import {shallow} from 'enzyme';
import ADD2ClassSelection from '../ADD2ClassSelection';

describe('ADD2 Class Selection Tests', () => {
    it('renders', () => {
        const component = shallow(<ADD2ClassSelection/>);
        expect(component.text()).toContain('Class Selection');
    });
});