import React from 'react';
import {shallow} from 'enzyme';
import VitalsDisplay from '../VitalsDisplay';

describe('VitalsDisplay tests', () => {
    it('renders a top-level div', () => {
        const component = shallow(<VitalsDisplay selectedChar={{}}/>);
        expect(component.find('div')).toHaveLength(1);
    });

    describe('when `selectedChar` is defined', () => {
        it('renders the expected vitals', () => {
            const testChar = {race: 'testRace', gender: 'testGender', className: 'testClass',
                alignment: 'testAlignment', age: 1, height: 2, weight: 3};
            const component = shallow(<VitalsDisplay selectedChar={testChar}/>);

            expect(component.text()).toContain('Race: testRace');
            expect(component.text()).toContain('Gender: testGender');
            expect(component.text()).toContain('Class: testClass');
            expect(component.text()).toContain('Alignment: testAlignment');
            expect(component.text()).toContain('Age: 1');
            expect(component.text()).toContain('Height: 0\'2"');
            expect(component.text()).toContain('Weight: 3');
        });
    });
});