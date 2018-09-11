import React from 'react';
import {shallow} from 'enzyme';
import StatAdjustmentDisplay from '../StatAdjustmentDisplay';

describe('Stat Adjustment Display tests', () => {
    it('renders expected text, stat, and adjustment', () => {
        const component = shallow(<StatAdjustmentDisplay text={'TEST'} stat={99} adjustment={-1}/>);
        expect(component.text()).toContain('TEST');
        expect(component.text()).toContain('99');
        expect(component.text()).toContain('-1');
    });
});