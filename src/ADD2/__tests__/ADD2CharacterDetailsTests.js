import React from 'react';
import {shallow} from 'enzyme';
import ADD2CharacterDetails from '../ADD2CharacterDetails';
import ADD2CharacterCreation from "../ADD2CharacterCreation";
import ADD2DisplayCompleted from "../ADD2DisplayCompleted";

describe('ADD2CharacterDetails Tests', () => {
    describe('when `selectedChar` is defined', () => {
        it('and character is complete, only ADD2DisplayCompleted is rendered', () => {
            const testChar = {completionStep: 6};
            const component = shallow(<ADD2CharacterDetails selectedChar={testChar} />);

            expect(component.find(ADD2DisplayCompleted)).toHaveLength(1);
            expect(component.find(ADD2CharacterCreation)).toHaveLength(0);
            expect(component.find('p')).toHaveLength(0);
        });

        it('and character is incomplete, only ADD2CharacterCreation is rendered', () => {
            const testChar = {completionStep: 5};
            const component = shallow(<ADD2CharacterDetails selectedChar={testChar} />);

            expect(component.find(ADD2DisplayCompleted)).toHaveLength(0);
            expect(component.find(ADD2CharacterCreation)).toHaveLength(1);
            expect(component.find('p')).toHaveLength(0);
        });
    });

    describe('when `selectedChar` is undefined', () => {
        it('only renders a `p` tag', () => {
            const component = shallow(<ADD2CharacterDetails/>);

            expect(component.find(ADD2DisplayCompleted)).toHaveLength(0);
            expect(component.find(ADD2CharacterCreation)).toHaveLength(0);
            expect(component.find('p')).toHaveLength(1);
        });
    });
});