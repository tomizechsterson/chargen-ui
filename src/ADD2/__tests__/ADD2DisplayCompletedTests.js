import React from 'react';
import {shallow} from 'enzyme';
import ADD2DisplayCompleted from '../ADD2DisplayCompleted';
import VitalsDisplay from "../../GeneralDisplays/VitalsDisplay";

describe('ADD2DisplayCompleted Tests', () => {
    it('always renders at least one div', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find('div').length).toBeGreaterThan(0);
    });

    it('always renders an `h4` with the character name', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{name: 'test'}}/>);
        expect(component.find('h4').text()).toEqual('test');
    });

    it('always renders a VitalsDisplay', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find(VitalsDisplay).length).toBe(2);
    });
});