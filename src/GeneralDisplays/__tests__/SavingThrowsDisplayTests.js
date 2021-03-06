import React from 'react';
import {shallow} from 'enzyme';
import SavingThrowsDisplay from '../SavingThrowsDisplay';

describe('SavingThrowsDisplay tests', () => {
    it('renders a top-level div', () => {
        const component = shallow(<SavingThrowsDisplay selectedChar={{}}/>);
        expect(component.find('div')).toHaveLength(1);
    });

    describe('when `selectedChar` is defined', () => {
        it('renders the expected saving throw values', () => {
            const testChar = {paralyze: 9, rod: 10, petrification: 11, breath: 12, spell: 13};
            const component = shallow(<SavingThrowsDisplay selectedChar={testChar}/>);

            expect(component.text()).toContain('Paralyzation, Poison, Death Magic: 9');
            expect(component.text()).toContain('Rod, Staff, Wand: 10');
            expect(component.text()).toContain('Petrification, Polymorph: 11');
            expect(component.text()).toContain('Breath Weapon: 12');
            expect(component.text()).toContain('Spell: 13');
        });
    });
});