import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
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

    it('renders assignment 2x description if double prop is true', () => {
        const component = shallow(<Assignment double={true}/>);
        expect(component.find('p').text()).toBe('Roll 12 and assign 6 to stats');
    });

    it('renders assignment description if double prop is false', () => {
        const component = shallow(<Assignment double={false}/>);
        expect(component.find('p').text()).toBe('Assign 6 rolls to stats');
    });

    describe('Save Stats button', () => {
        let updateFunc, component;

        beforeEach(() => {
            updateFunc = jest.fn();
            component = shallow(<Assignment onUpdate={updateFunc}/>);
        });

        it('if str is not assigned onUpdate is not called', () => {
            component.setState({selectedChar: {str: undefined, dex: 3, con: 3, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if dex is not assigned onUpdate is not called', () => {
            component.setState({selectedChar: {str: 3, dex: undefined, con: 3, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if con is not assigned onUpdate is not called', () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: undefined, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if int is not assigned onUpdate is not called', () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: undefined, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if wis is not assigned onUpdate is not called', () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: undefined, chr: 3}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if chr is not assigned onUpdate is not called', () => {
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: undefined}});
            component.find('input').at(1).simulate('click');
            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('if all stats are assigned, they are copied to selectedChar in props', () => {
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

        it('if all stats are assigned, completionStep is incremented', () => {
            component = shallow(<Assignment selectedChar={{completionStep: 0}} onUpdate={updateFunc}/>);
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');

            expect(component.instance().props.selectedChar.completionStep).toBe(1);
        });

        it('if all stats are assigned, onUpdate is called', () => {
            component = shallow(<Assignment selectedChar={{}} onUpdate={updateFunc}/>);
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3}});
            component.find('input').at(1).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
        });
    });

    describe('Roll Stats button', () => {
        it('resets the stats of the selectedChar in state', () => {
            const xhr = sinon.useFakeXMLHttpRequest();
            const requests = [];
            xhr.onCreate = function(xhr) {
                requests.push(xhr);
            }.bind(this);
            const component = shallow(<Assignment/>);
            component.setState({selectedChar: {str: 3, dex: 3, con: 3, int: 3, wis: 3, chr: 3}});

            component.find('input').at(0).simulate('click');

            requests[0].respond(200, {'Content-Type': 'text/json'}, '{}');
            expect(component.state().selectedChar.str).toBeUndefined();
            expect(component.state().selectedChar.dex).toBeUndefined();
            expect(component.state().selectedChar.con).toBeUndefined();
            expect(component.state().selectedChar.int).toBeUndefined();
            expect(component.state().selectedChar.wis).toBeUndefined();
            expect(component.state().selectedChar.chr).toBeUndefined();
            xhr.restore();
        });
    });
});