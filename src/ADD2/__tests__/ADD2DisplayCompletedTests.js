import React from 'react';
import {shallow} from 'enzyme';
import ADD2DisplayCompleted from '../ADD2DisplayCompleted';

describe('ADD2DisplayCompleted Tests', () => {
    it('renders at least one div', () => {
        const component = shallow(<ADD2DisplayCompleted selectedChar={{}}/>);
        expect(component.find('div').length).toBeGreaterThan(0);
    });
});