import React from 'react';
import {shallow} from 'enzyme';
import ADD2StatRoll from '../ADD2StatRoll';
import RollOnce from "../../StatRollRules/RollOnce";
import RollTwice from "../../StatRollRules/RollTwice";
import Assignment from "../../StatRollRules/Assignment";
import RollFour from "../../StatRollRules/RollFour";
import Add7Dice from "../../StatRollRules/Add7Dice";

describe('ADD2StatRoll', () => {
    it('always renders a top-level div', () => {
        expect(shallow(<ADD2StatRoll/>).find('div')).toHaveLength(1);
    });

    describe('roll rule drop down', () => {
        let component, rollRuleDropDown;

        beforeEach(() => {
            component = shallow(<ADD2StatRoll selectedChar={{}}/>);
            rollRuleDropDown = component.find('select');
        });

        it('changes state to selected roll rule', () => {
            rollRuleDropDown.simulate('change', {target: {value: 'testRule'}});
            expect(component.state().rollRule).toBe('testRule');
        });

        it('renders only RollOnce component if selected', () => {
            rollRuleDropDown.simulate('change', {target: {value: 'rollOnce'}});
            assertComponents(1, 0, 0, 0, 0);
        });

        it('renders only RollTwice component if selected', () => {
            rollRuleDropDown.simulate('change', {target: {value: 'rollTwice'}});
            assertComponents(0, 1, 0, 0, 0);
        });

        it('renders only Assignment component if selected', () => {
            rollRuleDropDown.simulate('change', {target: {value: 'assignment'}});
            assertComponents(0, 0, 1, 0, 0);
        });

        it('renders only Assignment component if 2x is selected', () => {
            rollRuleDropDown.simulate('change', {target: {value: 'assignment2x'}});
            assertComponents(0, 0, 1, 0, 0);
        });

        it('renders only RollFour component if selected', () => {
            rollRuleDropDown.simulate('change', {target: {value: 'roll4'}});
            assertComponents(0, 0, 0, 1, 0);
        });

        it('renders only Add7 component if selected', () => {
            rollRuleDropDown.simulate('change', {target: {value: 'add7Dice'}});
            assertComponents(0, 0, 0, 0, 1);
        });

        const assertComponents = (rollOnce, rollTwice, assignment, rollFour, addSeven) => {
            expect(component.find(RollOnce)).toHaveLength(rollOnce);
            expect(component.find(RollTwice)).toHaveLength(rollTwice);
            expect(component.find(Assignment)).toHaveLength(assignment);
            expect(component.find(RollFour)).toHaveLength(rollFour);
            expect(component.find(Add7Dice)).toHaveLength(addSeven);
        };

        describe('when one of the assignment rules is selected', () => {
            it('passes false as double prop to Assignment when single is selected', () => {
                rollRuleDropDown.simulate('change', {target: {value: 'assignment'}});
                const assignment = component.find(Assignment);
                expect(assignment.props().double).toBeFalsy();
            });

            it('passes true as double prop to Assignment when 2x is selected', () => {
                rollRuleDropDown.simulate('change', {target: {value: 'assignment2x'}});
                const assignment = component.find(Assignment);
                expect(assignment.props().double).toBeTruthy();
            });
        });

        describe('when Add7Dice is selected', () => {
            it('passes selectedChar with 8 in all its stats', () => {
                rollRuleDropDown.simulate('change', {target: {value: 'add7Dice'}});
                const add7 = component.find(Add7Dice);
                const selected = add7.props().selectedChar;
                expect(selected.str).toBe(8);
                expect(selected.dex).toBe(8);
                expect(selected.con).toBe(8);
                expect(selected.int).toBe(8);
                expect(selected.wis).toBe(8);
                expect(selected.chr).toBe(8);
            });
        });
    });
});
