import React from 'react';
import {shallow, mount} from 'enzyme';
import Add7DiceDisplay from '../Add7DiceDisplay';
import RollSelector from '../RollSelector';

describe('Add7DiceDisplay tests', () => {
    let component, defaultChar;
    beforeEach(() => {
        defaultChar = {str: 8, dex: 8, con: 8, int: 8, wis: 8, chr: 8};
        component = shallow(<Add7DiceDisplay rolls={[]} selectedChar={defaultChar}/>);
    });

    it('renders a top-level div and expected child components', () => {
        expect(component.find('div')).toHaveLength(1);
        expect(component.find('button')).toHaveLength(8);
        expect(component.find(RollSelector)).toHaveLength(1);
    });

    it('renders selected stat and roll', () => {
        component.setState({selectedStat: 'test', selectedRoll: {value: 99}});
        expect(component.find('div').text()).toContain('Selected Stat: test');
        expect(component.find('div').text()).toContain('Selected Roll: 99');
    });

    it('renders the stats of selectedChar', () => {
        expect(component.find('div').text()).toContain('STR 8');
        expect(component.find('div').text()).toContain('DEX 8');
        expect(component.find('div').text()).toContain('CON 8');
        expect(component.find('div').text()).toContain('INT 8');
        expect(component.find('div').text()).toContain('WIS 8');
        expect(component.find('div').text()).toContain('CHR 8');
    });

    describe('Stat Selection Buttons', () => {
        let component;
        beforeEach(() => {
            component = shallow(<Add7DiceDisplay rolls={[]} selectedChar={{}}/>);
        });

        it('selects str', () => {
            component.find('button').at(0).simulate('click');
            expect(component.state().selectedStat).toBe('STR');
        });

        it('deselects the expected stat', () => {
            component.setState({selectedStat: 'STR'});
            component.find('button').at(0).simulate('click');
            expect(component.state().selectedStat).toBe('');
        });

        it('selects dex', () => {
            component.find('button').at(1).simulate('click');
            expect(component.state().selectedStat).toBe('DEX');
        });

        it('selects con', () => {
            component.find('button').at(2).simulate('click');
            expect(component.state().selectedStat).toBe('CON');
        });

        it('selects int', () => {
            component.find('button').at(3).simulate('click');
            expect(component.state().selectedStat).toBe('INT');
        });

        it('selects wis', () => {
            component.find('button').at(4).simulate('click');
            expect(component.state().selectedStat).toBe('WIS');
        });

        it('selects chr', () => {
            component.find('button').at(5).simulate('click');
            expect(component.state().selectedStat).toBe('CHR');
        });
    });

    describe('Roll Selection Buttons', () => {
        let component, rollButton;
        beforeEach(() => {
            component = mount(<Add7DiceDisplay rolls={getTestRolls()} selectedChar={{}}/>);
            rollButton = component.find(RollSelector).find('button').at(0);
        });
        it('selects expected roll', () => {
            rollButton.simulate('click');
            expect(component.state().selectedRoll).toEqual(getTestRolls()[0]);
        });

        it('deselects expected roll', () => {
            component.setState({selectedRoll: getTestRolls()[0]});
            rollButton.simulate('click');
            expect(component.state().selectedRoll).toBeUndefined();
        });

        const getTestRolls = () => {
            return [{id: 1, value: 1, assigned: false}, {id: 2, value: 2, assigned: false},
                {id: 3, value: 3, assigned: true}, {id: 4, value: 4, assigned: true},
                {id: 5, value: 5, assigned: true}, {id: 6, value: 6, assigned: true},
                {id: 7, value: 1, assigned: false}];
        };
    });

    describe('Assignment Button', () => {
        it('is disabled when there is no selected roll', () => {
            const component = shallow(<Add7DiceDisplay rolls={[]} selectedChar={{}}/>);
            component.setState({selectedStat: 'test'});
            expect(component.find('button').at(6).html()).toContain('disabled=""');
        });

        it('is disabled when there is no selected stat', () => {
            const component = shallow(<Add7DiceDisplay rolls={[]} selectedChar={{}}/>);
            component.setState({selectedRoll: {}});
            expect(component.find('button').at(6).html()).toContain('disabled=""');
        });

        it('is enabled when there is a selected stat and roll', () => {
            component.setState({selectedStat: 'test', selectedRoll: {}});
            expect(component.find('button').at(6).html()).not.toContain('disabled=""');
        });

        describe('Does not allow stats to exceed 18', () => {
            let component, testRolls;
            beforeEach(() => {
                testRolls = [{value: 4}];
                component = shallow(<Add7DiceDisplay rolls={testRolls} selectedChar={{str: 15, dex: 15, con: 15, int: 15, wis: 15, chr: 15}}/>);
            });

            it('str', () => {
                component.setState({selectedRoll: testRolls[0], selectedStat: 'STR'});
                component.find('button').at(6).simulate('click');

                expect(component.instance().props.selectedChar.str).toBe(15);
            });

            it('dex', () => {
                component.setState({selectedRoll: testRolls[0], selectedStat: 'DEX'});
                component.find('button').at(6).simulate('click');

                expect(component.instance().props.selectedChar.dex).toBe(15);
            });

            it('con', () => {
                component.setState({selectedRoll: testRolls[0], selectedStat: 'CON'});
                component.find('button').at(6).simulate('click');

                expect(component.instance().props.selectedChar.con).toBe(15);
            });

            it('int', () => {
                component.setState({selectedRoll: testRolls[0], selectedStat: 'INT'});
                component.find('button').at(6).simulate('click');

                expect(component.instance().props.selectedChar.int).toBe(15);
            });

            it('wis', () => {
                component.setState({selectedRoll: testRolls[0], selectedStat: 'WIS'});
                component.find('button').at(6).simulate('click');

                expect(component.instance().props.selectedChar.wis).toBe(15);
            });

            it('chr', () => {
                component.setState({selectedRoll: testRolls[0], selectedStat: 'CHR'});
                component.find('button').at(6).simulate('click');

                expect(component.instance().props.selectedChar.chr).toBe(15);
            });
        });

        describe('Adds to stat and clears selected roll', () => {
            it('str', () => {
                const component = assignStat('STR', 0);
                const props = component.instance().props;
                assertStatAssignment(props.selectedChar.str, 9, props.rolls[0], component, 'STR');
            });

            it('dex', () => {
                const component = assignStat('DEX', 1);
                const props = component.instance().props;
                assertStatAssignment(props.selectedChar.dex, 10, props.rolls[1], component, 'DEX');
            });

            it('con', () => {
                const component = assignStat('CON', 2);
                const props = component.instance().props;
                assertStatAssignment(props.selectedChar.con, 11, props.rolls[2], component, 'CON');
            });

            it('int', () => {
                const component = assignStat('INT', 3);
                const props = component.instance().props;
                assertStatAssignment(props.selectedChar.int, 12, props.rolls[3], component, 'INT');
            });

            it('wis', () => {
                const component = assignStat('WIS', 4);
                const props = component.instance().props;
                assertStatAssignment(props.selectedChar.wis, 13, props.rolls[4], component, 'WIS');
            });

            it('chr', () => {
                const component = assignStat('CHR', 5);
                const props = component.instance().props;
                assertStatAssignment(props.selectedChar.chr, 14, props.rolls[5], component, 'CHR');
            });

            const assignStat = (stat, testRollIndex) => {
                const component = shallow(<Add7DiceDisplay selectedChar={defaultChar} rolls={getTestRolls()}/>);
                component.setState({selectedRoll: getTestRolls()[testRollIndex], selectedStat: stat});
                component.find('button').at(6).simulate('click');
                return component;
            };

            const assertStatAssignment = (selectedStat, value, propRoll, component, statText) => {
                expect(selectedStat).toBe(value);
                expect(propRoll.assigned).toBeTruthy();
                expect(component.state().selectedStat).toBe(statText);
                expect(component.state().selectedRoll).toBeUndefined();
            };

            const getTestRolls = () => {
                return [{id: 1, value: 1, assigned: false}, {id: 2, value: 2, assigned: false},
                    {id: 3, value: 3, assigned: false}, {id: 4, value: 4, assigned: false},
                    {id: 5, value: 5, assigned: false}, {id: 6, value: 6, assigned: false},
                    {id: 7, value: 1, assigned: false}];
            };
        });
    });

    describe('Reset Button', () => {
        it('is disabled when no rolls have been assigned', () => {
            const component = shallow(<Add7DiceDisplay rolls={[{assigned: false}, {assigned: false}]} selectedChar={{}}/>);
            expect(component.find('button').at(7).html()).toContain('disabled=""');
        });

        it('is enabled when at least one roll has been assigned', () => {
            const component = shallow(<Add7DiceDisplay rolls={[{assigned: true}, {assigned: false}]} selectedChar={{}}/>);
            expect(component.find('button').at(7).html()).not.toContain('disabled=""');
        });

        it('resets all stats to 8 and all rolls to unassigned when clicked', () => {
            const component = shallow(<Add7DiceDisplay
                selectedChar={{str: 10, dex: 11, con: 12, int: 13, wis: 14, chr: 15}}
                rolls={[{assigned: true}, {assigned: true}, {assigned: true}, {assigned: true},
                    {assigned: true}, {assigned: true}, {assigned: true}, ]}/>);
            component.setState({selectedStat: 'test', selectedRoll: {id: 1}});

            component.find('button').at(7).simulate('click');

            const testChar = component.instance().props.selectedChar;
            expect(testChar.str).toBe(8);
            expect(testChar.dex).toBe(8);
            expect(testChar.con).toBe(8);
            expect(testChar.int).toBe(8);
            expect(testChar.wis).toBe(8);
            expect(testChar.chr).toBe(8);
            component.instance().props.rolls.forEach((roll) => {
                expect(roll.assigned).toBeFalsy();
            });
            expect(component.state().selectedStat).toBe('');
            expect(component.state().selectedRoll).toBeUndefined();
        });
    });
});