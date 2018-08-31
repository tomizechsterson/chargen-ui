import React from 'react';
import {shallow} from 'enzyme';
import Add7DiceDisplay from '../Add7DiceDisplay';

describe('Add7DiceDisplay tests', () => {
    it('renders a top-level div', () => {
        const component = shallow(<Add7DiceDisplay/>);
        expect(component.find('div')).toHaveLength(1);
    });
});