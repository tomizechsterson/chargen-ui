import React from 'react';
import {shallow} from 'enzyme';
import ADD2StatRoll from '../ADD2StatRoll';
import RollOnce from "../../StatRollRules/RollOnce";
import RollTwice from "../../StatRollRules/RollTwice";
import Assignment from "../../StatRollRules/Assignment";
import RollFour from "../../StatRollRules/RollFour";

describe('ADD2StatRoll', () => {
    it('always renders a top-level div', () => {
        expect(shallow(<ADD2StatRoll/>).find('div')).toHaveLength(1);
    });

    describe('roll rule drop down', () => {
        let component;
        let dropDown;
        const assertComponents = (rollOnce, rollTwice, assignment, rollFour, addSeven) => {
            expect(component.find(RollOnce)).toHaveLength(rollOnce);
            expect(component.find(RollTwice)).toHaveLength(rollTwice);
            expect(component.find(Assignment)).toHaveLength(assignment);
            expect(component.find(RollFour)).toHaveLength(rollFour);
            expect(component.find('p')).toHaveLength(addSeven);
        };

        beforeEach(() => {
            component = shallow(<ADD2StatRoll/>);
            dropDown = component.find('select');
        });

        it('changes state to selected roll rule', () => {
            dropDown.simulate('change', {target: {value: 'testRule'}});
            expect(component.state().rollRule).toBe('testRule');
        });

        it('renders only RollOnce component if selected', () => {
            dropDown.simulate('change', {target: {value: 'rollOnce'}});
            assertComponents(1, 0, 0, 0, 0);
        });

        it('renders only RollTwice component if selected', () => {
            dropDown.simulate('change', {target: {value: 'rollTwice'}});
            assertComponents(0, 1, 0, 0, 0);
        });

        it('renders only Assignment component if selected', () => {
            dropDown.simulate('change', {target: {value: 'assignment'}});
            assertComponents(0, 0, 1, 0, 0);
        });

        it('renders only Assignment component if 2x is selected', () => {
            dropDown.simulate('change', {target: {value: 'assignment2x'}});
            assertComponents(0, 0, 1, 0, 0);
        });

        it('renders only RollFour component if selected', () => {
            dropDown.simulate('change', {target: {value: 'roll4'}});
            assertComponents(0, 0, 0, 1, 0);
        });

        it('renders only Add7 component if selected', () => {
            dropDown.simulate('change', {target: {value: 'add7Dice'}});
            assertComponents(0, 0, 0, 0, 1);
        });

        describe('when one of the assignment rules is selected', () => {
            it('false is passed as double prop to Assignment when single is selected', () => {
                dropDown.simulate('change', {target: {value: 'assignment'}});
                const assignment = component.find(Assignment);
                expect(assignment.props().double).toBeFalsy();
            });

            it('true is passed as double prop to Assignment when 2x is selected', () => {
                dropDown.simulate('change', {target: {value: 'assignment2x'}});
                const assignment = component.find(Assignment);
                expect(assignment.props().double).toBeTruthy();
            });
        });
    });
});