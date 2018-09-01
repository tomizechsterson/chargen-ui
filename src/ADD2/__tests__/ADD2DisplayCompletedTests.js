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
        expect(component.find(VitalsDisplay)).toHaveLength(1);
    });

    it('always renders a StatsDisplay', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find(StatsDisplay)).toHaveLength(1);
    });

    it('always renders a SavingThrowsDisplay', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find(SavingThrowsDisplay)).toHaveLength(1);
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
});