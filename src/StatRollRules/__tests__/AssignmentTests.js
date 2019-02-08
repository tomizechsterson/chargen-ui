import React from 'react';
import {shallow} from 'enzyme';
import Assignment from '../Assignment';
import AssignmentDisplay from "../AssignmentDisplay";
import Assignment2xDisplay from "../Assignment2xDisplay";
describe('Assignment component tests placeholder', () => {
    it('does nothing', () => {

    });
});
/*describe('Assignment component tests', () => {
    it('renders AssignmentDisplay if double prop is false', () => {
        const component = shallow(<Assignment double={false}/>);
        expect(component.find(AssignmentDisplay)).toHaveLength(1);
        expect(component.find(Assignment2xDisplay)).toHaveLength(0);
    });

    it('renders assignment description if double prop is false', () => {
        const component = shallow(<Assignment double={false}/>);
        expect(component.find('p').text()).toBe('Assign 6 rolls to stats');
    });

    it('renders Assignment2xDisplay if double prop is true', () => {
        const component = shallow(<Assignment double={true}/>);
        expect(component.find(AssignmentDisplay)).toHaveLength(0);
        expect(component.find(Assignment2xDisplay)).toHaveLength(1);
    });

    it('renders assignment 2x description if double prop is true', () => {
        const component = shallow(<Assignment double={true}/>);
        expect(component.find('p').text()).toBe('Roll 12 and assign 6 to stats');
    });

    describe('Save Stats button', () => {
        let updateFunc, component;

        beforeEach(() => {
            updateFunc = jest.fn();
            component = shallow(<Assignment onUpdate={updateFunc}/>);
        });

        it('does not call onUpdate if str is not assigned', () => {
            component.setState({selectedChar: {str: undefined, dex: 3, con: 3, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('does not call onUpdate if dex is not assigned', () => {
            component.setState({selectedChar: {str: 3, dex: undefined, con: 3, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('does not call onUpdate if con is not assigned', () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: undefined, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('does not call onUpdate if int is not assigned', () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: undefined, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('does not call onUpdate if wis is not assigned', () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: undefined, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('does not call onUpdate if chr is not assigned', () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: undefined}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('copies stats to selectedChar in props if all stats are assigned', () => {
            component = shallow(<Assignment selectedChar={{}} onUpdate={updateFunc}/>);
            component.setState({selectedChar: {str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8}});
            component.find('input').at(1).simulate('click');

            expect(component.instance().props.selectedChar.str).toBe(3);
            expect(component.instance().props.selectedChar.dex).toBe(4);
            expect(component.instance().props.selectedChar.con).toBe(5);
            expect(component.instance().props.selectedChar.int).toBe(6);
            expect(component.instance().props.selectedChar.wis).toBe(7);
            expect(component.instance().props.selectedChar.chr).toBe(8);
        });

        it('increments completionStep if all stats are assigned', () => {
            component = shallow(<Assignment selectedChar={{completionStep: 0}} onUpdate={updateFunc}/>);
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');

            expect(component.instance().props.selectedChar.completionStep).toBe(1);
        });

        it('calls onUpdate if all stats are assigned', () => {
            component = shallow(<Assignment selectedChar={{}} onUpdate={updateFunc}/>);
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
        });
    });

    describe('Roll Stats button', () => {
        let component;
        function mockGateway() { return {
            rollStats: (rollRule) => { return rollRule === 'rollstats/assignmentDouble'
                ? [[1, 1, 1], [1, 1, 2], [1, 1, 3], [1, 1, 4], [1, 1, 5], [1, 1, 6], [1, 1, 1], [1, 1, 2], [1, 1, 3], [1, 1, 4], [1, 1, 5], [1, 1, 6]]
                : [[1, 1, 1], [1, 1, 2], [1, 1, 3], [1, 1, 4], [1, 1, 5], [1, 1, 6]]
            }
        }}
        function tick() {
            return new Promise(resolve => {setTimeout(resolve, 0)});
        }
        beforeEach(() => {
            component = shallow(<Assignment gateway={mockGateway()}/>);
        });

        it('resets the stats of the selectedChar in state on response status 200', async () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3}});

            component.find('input').at(0).simulate('click');
            await tick();

            expect(component.state().selectedChar.str).toBeUndefined();
            expect(component.state().selectedChar.dex).toBeUndefined();
            expect(component.state().selectedChar.con).toBeUndefined();
            expect(component.state().selectedChar.int).toBeUndefined();
            expect(component.state().selectedChar.wis).toBeUndefined();
            expect(component.state().selectedChar.chr).toBeUndefined();
        });

        it('the component has 6 rolls returned when double is false', async () => {
            const component = shallow(<Assignment double={false} gateway={mockGateway()}/>);

            component.find('input').at(0).simulate('click');
            await tick();

            expect(component.state().rolls).toHaveLength(6);
        });

        it('the component has 12 rolls returned from the gateway when double is true', async () => {
            const component = shallow(<Assignment double={true} gateway={mockGateway()}/>);

            component.find('input').at(0).simulate('click');
            await tick();

            expect(component.state().rolls).toHaveLength(12);
        });

        it('populates the expected roll objects with the response data', async () => {
            component.setState({selectedChar: {}});

            component.find('input').at(0).simulate('click');
            await tick();

            const rollObjects = component.state().rolls;
            assertRollObject(rollObjects[0], 0, false, ' (1 + 1 + 1)', 3);
            assertRollObject(rollObjects[1], 1, false, ' (1 + 1 + 2)', 4);
            assertRollObject(rollObjects[2], 2, false, ' (1 + 1 + 3)', 5);
            assertRollObject(rollObjects[3], 3, false, ' (1 + 1 + 4)', 6);
            assertRollObject(rollObjects[4], 4, false, ' (1 + 1 + 5)', 7);
            assertRollObject(rollObjects[5], 5, false, ' (1 + 1 + 6)', 8);
        });

        const assertRollObject = (roll, expectedId, shouldBeAssigned, expectedText, expectedValue) => {
            expect(roll.id).toBe(expectedId);
            expect(roll.assigned).toBe(shouldBeAssigned);
            expect(roll.text).toBe(expectedText);
            expect(roll.value).toBe(expectedValue);
        };
    });
});*/;