import React from 'react';
import {shallow} from 'enzyme';
import ADD2DisplayCompleted from '../ADD2DisplayCompleted';
import VitalsDisplay from "../../GeneralDisplays/VitalsDisplay";
import StatsDisplay from "../../GeneralDisplays/StatsDisplay";
import SavingThrowsDisplay from "../../GeneralDisplays/SavingThrowsDisplay";

describe('ADD2DisplayCompleted Tests', () => {
    it('always renders at least one div', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find('div').length).toBeGreaterThan(0);
    });

    it('always renders an `h4` with the character name', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{name: 'testName'}}/>);
        expect(component.find('h4').text()).toEqual('testName');
    });

    it('always renders a VitalsDisplay', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find(VitalsDisplay)).toBeDefined();
    });

    it('always renders a StatsDisplay', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find(StatsDisplay)).toBeDefined();
    });

    it('always renders a SavingThrowsDisplay', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find(SavingThrowsDisplay)).toBeDefined();
    });

    it('always renders the delete button', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find('button')).toBeDefined();
        expect(component.find('button').text()).toEqual('Delete');
    });

    describe('when selectedChar is defined', () => {
        let testChar = {};

        it('sets the rendered `VitalsDisplay`s `selectedChar` prop to the same value as `testChar`', () => {
            const vitalsDisplay = shallow(<ADD2DisplayCompleted selectedChar={testChar}/>).find(VitalsDisplay);
            expect(vitalsDisplay.props().selectedChar).toBe(testChar);
        });

        it('sets the rendered `StatsDisplay`s `selectedChar` prop to the same value as `testChar`', () => {
            const statsDisplay = shallow(<ADD2DisplayCompleted selectedChar={testChar}/>).find(StatsDisplay);
            expect(statsDisplay.props().selectedChar).toBe(testChar);
        });

        it('sets the rendered `VitalsDisplay`s `selectedChar` prop to the same value as `testChar`', () => {
            const savingThrowsDisplay = shallow(<ADD2DisplayCompleted selectedChar={testChar}/>).find(SavingThrowsDisplay);
            expect(savingThrowsDisplay.props().selectedChar).toBe(testChar);
        });
    });

    describe('delete button', () => {
        it('calls delete with selected character id when clicked', () => {
            const deleteFunc = jest.fn();
            const component = shallow(<ADD2DisplayCompleted onDelete={deleteFunc} selectedChar={{id: 1}}/>);
            const button = component.find('button').first();

            button.simulate('click');

            expect(deleteFunc).toBeCalledWith(1);
        });
    });
});