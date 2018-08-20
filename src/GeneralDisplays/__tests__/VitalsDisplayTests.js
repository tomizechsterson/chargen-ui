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

            const pTag = component.find('p');
            expect(pTag.text()).toContain('Race: testRace');
            expect(pTag.text()).toContain('Gender: testGender');
            expect(pTag.text()).toContain('Class: testClass');
            expect(pTag.text()).toContain('Alignment: testAlignment');
            expect(pTag.text()).toContain('Age: 1');
            expect(pTag.text()).toContain('Height: 2');
            expect(pTag.text()).toContain('Weight: 3');
        });
    });
});