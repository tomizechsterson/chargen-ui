import React from 'react';
import {shallow} from 'enzyme';
import AssignmentDisplay from '../AssignmentDisplay';
import AssignmentControl from "../AssignmentControl";

describe('AssignmentDisplay tests', () => {
    let component;
    beforeEach(() => {
        component = shallow(<AssignmentDisplay rolls={[]} selectedChar={{}}/>);
    });

    it('renders a top-level div and expected child elements', () => {
        expect(component.find('div')).toHaveLength(1);
        expect(component.find(AssignmentControl)).toHaveLength(6);
        expect(component.find('input')).toHaveLength(2);
    });

    it('renders selected stat and roll text', () => {
        component.setState({selectedStat: 'test', selectedRoll: {value: '99'}});
        expect(component.find('div').text()).toContain('Selected Stat: test');
        expect(component.find('div').text()).toContain('Selected Roll: 99');
    });

    describe('Assign button', () => {
        let component;
        beforeEach(() => {
            component = shallow(<AssignmentDisplay rolls={[]} selectedChar={{}}/>);
        });

        it('is disabled when there is no selected roll', () => {
            component.setState({selectedStat: 'test'});
            expect(component.find('input').at(0).html()).toContain('disabled=""');
        });

        it('is disabled when there is no selected stat', () => {
            component.setState({selectedRoll: {}});
            expect(component.find('input').at(0).html()).toContain('disabled=""');
        });

        it('is enabled when there is a selected stat and roll', () => {
            component.setState({selectedStat: 'test', selectedRoll: {}});
            expect(component.find('input').at(0).html()).not.toContain('disabled=""');
        });
    });

    describe('Reset button', () => {
        it('is disabled when no stats have been assigned a value', () => {
            const testChar = {};
            const component = shallow(<AssignmentDisplay rolls={[]} selectedChar={testChar}/>);

            expect(component.find('input').at(1).html()).toContain('disabled=""');
        });

        it('is enabled when str has been assigned', () => {
            assertResetButton({str: 3});
        });

        it('is enabled when dex has been assigned', () => {
            assertResetButton({dex: 3})
        });

        it('is enabled when con has been assigned', () => {
            assertResetButton({con: 3})
        });

        it('is enabled when int has been assigned', () => {
            assertResetButton({int: 3});
        });

        it('is enabled when wis has been assigned', () => {
            assertResetButton({wis: 3});
        });

        it('is enabled when chr has been assigned', () => {
            assertResetButton({chr: 3});
        });

        const assertResetButton = (testChar) => {
            const component = shallow(<AssignmentDisplay rolls={[]} selectedChar={testChar}/>);
            expect(component.find('input').at(1).html()).not.toContain('disabled=""');
        };

        it('resets all stats to undefined and all rolls to unassigned when clicked', () => {

        });
    });
});