import React from 'react';
import {shallow} from 'enzyme';
import AssignmentControl from '../AssignmentControl';

describe('AssignmentControl tests', () => {
    it('renders a top-level div', () => {
        const component = shallow(<AssignmentControl rolls={[]}/>);
        expect(component.find('div')).toHaveLength(1);
    });
});