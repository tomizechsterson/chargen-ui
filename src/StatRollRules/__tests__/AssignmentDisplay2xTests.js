import React from 'react';
import {shallow, mount} from 'enzyme';
import Assignment2xDisplay from '../Assignment2xDisplay';
import AssignmentControl from "../AssignmentControl";

describe('Assignment2xDisplay tests', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Assignment2xDisplay rolls={[]} selectedChar={{}}/>);
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

    describe('AssignmentControl components', () => {
        let component, assignmentControl, testRolls;

        beforeEach(() => {
            testRolls = getTestRolls();
            component = mount(<Assignment2xDisplay rolls={testRolls} selectedChar={{}}/>);
            assignmentControl = component.find(AssignmentControl).at(0);
        });

        it('selects expected stat', () => {
            assignmentControl.find('input').at(0).simulate('click');
            expect(component.state().selectedStat).toBe('STR');
        });

        it('deselects expected stat', () => {
            component.setState({selectedStat: 'STR'});
            assignmentControl.find('input').at(0).simulate('click');
            expect(component.state().selectedStat).toBe('');
        });

        it('selects first roll', () => {
            assignmentControl.find('input').at(1).simulate('click');
            expect(component.state().selectedRoll.id).toBe(1);
        });

        it('deselects first roll', () => {
            component.setState({selectedRoll: testRolls[0]});
            assignmentControl.find('input').at(1).simulate('click');
            expect(component.state().selectedRoll).toBeUndefined();
        });

        it('selects second roll', () => {
            assignmentControl.find('input').at(2).simulate('click');
            expect(component.state().selectedRoll.id).toBe(2);
        });

        it('deselects second roll', () => {
            component.setState({selectedRoll: testRolls[1]});
            assignmentControl.find('input').at(2).simulate('click');
            expect(component.state().selectedRoll).toBeUndefined();
        });

        const getTestRolls = () => {
            return [{id: 1, value: 3, assigned: false}, {id: 2, value: 4, assigned: false}];
        };
    });

    describe('Assign button', () => {
        let component;
        beforeEach(() => {
            component = shallow(<Assignment2xDisplay rolls={[]} selectedChar={{}}/>);
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

        describe('Assigns stats and clears selected stat and roll', () => {
            it('str', () => {
                const component = assignStat('STR');
                assertStatAssignment(component, component.instance().props.selectedChar.str);
            });

            it('dex', () => {
                const component = assignStat('DEX');
                assertStatAssignment(component, component.instance().props.selectedChar.dex);
            });

            it('con', () => {
                const component = assignStat('CON');
                assertStatAssignment(component, component.instance().props.selectedChar.con);
            });

            it('int', () => {
                const component = assignStat('INT');
                assertStatAssignment(component, component.instance().props.selectedChar.int);
            });

            it('wis', () => {
                const component = assignStat('WIS');
                assertStatAssignment(component, component.instance().props.selectedChar.wis);
            });

            it('chr', () => {
                const component = assignStat('CHR');
                assertStatAssignment(component, component.instance().props.selectedChar.chr);
            });

            const assignStat = (stat) => {
                const testRolls = [{id: 1, value: 3, assigned: false}];
                const component = shallow(<Assignment2xDisplay selectedChar={{}} rolls={testRolls}/>);
                component.setState({selectedRoll: testRolls[0], selectedStat: stat});
                component.find('input').at(0).simulate('click');
                return component;
            };

            const assertStatAssignment = (component, selectedCharStat) => {
                expect(selectedCharStat).toBe(3);
                expect(component.instance().props.rolls[0].assigned).toBeTruthy();
                expect(component.state().selectedStat).toBe('');
                expect(component.state().selectedRoll).toBeUndefined();
            };
        });
    });

    describe('Reset button', () => {
        it('is disabled when no stats have been assigned a value', () => {
            const testChar = {};
            const component = shallow(<Assignment2xDisplay rolls={[]} selectedChar={testChar}/>);

            expect(component.find('input').at(1).html()).toContain('disabled=""');
        });

        it('is enabled when str has been assigned', () => {
            assertResetButtonEnabled({str: 3});
        });

        it('is enabled when dex has been assigned', () => {
            assertResetButtonEnabled({dex: 3})
        });

        it('is enabled when con has been assigned', () => {
            assertResetButtonEnabled({con: 3})
        });

        it('is enabled when int has been assigned', () => {
            assertResetButtonEnabled({int: 3});
        });

        it('is enabled when wis has been assigned', () => {
            assertResetButtonEnabled({wis: 3});
        });

        it('is enabled when chr has been assigned', () => {
            assertResetButtonEnabled({chr: 3});
        });

        const assertResetButtonEnabled = (testChar) => {
            const component = shallow(<Assignment2xDisplay rolls={[]} selectedChar={testChar}/>);
            expect(component.find('input').at(1).html()).not.toContain('disabled=""');
        };

        it('resets all stats to undefined and all rolls to unassigned when clicked', () => {
            const component = shallow(<Assignment2xDisplay
                rolls={[{assigned: true}, {assigned: true}, {assigned: true}, {assigned: true}, {assigned: true}, {assigned: true},
                    {assigned: true}, {assigned: true}, {assigned: true}, {assigned: true}, {assigned: true}, {assigned: true}]}
                selectedChar={{str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3}}/>);

            component.find('input').at(1).simulate('click');

            const testChar = component.instance().props.selectedChar;
            expect(testChar.str).toBeUndefined();
            expect(testChar.dex).toBeUndefined();
            expect(testChar.con).toBeUndefined();
            expect(testChar.int).toBeUndefined();
            expect(testChar.wis).toBeUndefined();
            expect(testChar.chr).toBeUndefined();
            component.instance().props.rolls.forEach((roll) => {
                expect(roll.assigned).toBeFalsy();
            });
        });
    });
});