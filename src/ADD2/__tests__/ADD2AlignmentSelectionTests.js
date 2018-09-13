import React from 'react';
import {shallow} from 'enzyme';
import ADD2AlignmentSelection from '../ADD2AlignmentSelection';

describe('ADD2 Alignment Selection Tests', () => {
    it('renders', () => {
        const component = shallow(<ADD2AlignmentSelection/>);
        expect(component.find('div')).toHaveLength(1);
    });
});