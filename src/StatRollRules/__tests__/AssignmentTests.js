import React from 'react';
import {shallow} from 'enzyme';
import Assignment from '../Assignment';
import AssignmentDisplay from "../AssignmentDisplay";
import Assignment2xDisplay from "../Assignment2xDisplay";

describe('Assignment component tests', () => {
    it('renders a top-level div', () => {
        const component = shallow(<Assignment/>);
        expect(component.find('div')).toHaveLength(1);
    });

    it('renders AssignmentDisplay if double prop is false', () => {
        const component = shallow(<Assignment double={false}/>);
        expect(component.find(AssignmentDisplay)).toHaveLength(1);
        expect(component.find(Assignment2xDisplay)).toHaveLength(0);
    });

    it('renders Assignment2xDisplay if double prop is true', () => {
        const component = shallow(<Assignment double={true}/>);
        expect(component.find(AssignmentDisplay)).toHaveLength(0);
        expect(component.find(Assignment2xDisplay)).toHaveLength(1);
    });
});