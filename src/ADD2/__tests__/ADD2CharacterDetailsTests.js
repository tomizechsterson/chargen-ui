import React from 'react';
import {shallow} from 'enzyme';
import ADD2CharacterDetails from '../ADD2CharacterDetails';
import ADD2CharacterCreation from "../ADD2CharacterCreation";
import ADD2DisplayCompleted from "../ADD2DisplayCompleted";

describe('ADD2CharacterDetails Tests', () => {
    it('always renders a div', () => {
        const component = shallow(<ADD2CharacterDetails/>);
        expect(component.find('div')).toHaveLength(1);
    });

    describe('when `selectedChar` is defined', () => {
        it('and character is complete, only ADD2DisplayCompleted is rendered', () => {
            const testChar = {completionStep: 2};
            const component = shallow(<ADD2CharacterDetails selectedChar={testChar} />);

            expect(component.find(ADD2DisplayCompleted)).toHaveLength(1);
            expect(component.find(ADD2CharacterCreation)).toHaveLength(0);
            expect(component.find('p')).toHaveLength(0);
        });

        it('and character is incomplete, only ADD2CharacterCreation is rendered', () => {
            const testChar = {completionStep: 0};
            const component = shallow(<ADD2CharacterDetails selectedChar={testChar} />);

            expect(component.find(ADD2DisplayCompleted)).toHaveLength(0);
            expect(component.find(ADD2CharacterCreation)).toHaveLength(1);
            expect(component.find('p')).toHaveLength(0);
        });

        it('renders the delete button', () => {
            const component = shallow(<ADD2CharacterDetails selectedChar={{}}/>);
            expect(component.find('button')).toBeDefined();
            expect(component.find('button').text()).toEqual('Delete');
        });
    });

    describe('when `selectedChar` is undefined', () => {
        it('only renders a `p` tag', () => {
            const component = shallow(<ADD2CharacterDetails/>);

            expect(component.find(ADD2DisplayCompleted)).toHaveLength(0);
            expect(component.find(ADD2CharacterCreation)).toHaveLength(0);
            expect(component.find('button')).toHaveLength(0);
            expect(component.find('p')).toHaveLength(1);
        });
    });

    describe('delete button', () => {
        it('calls delete with selected character id when clicked', () => {
            const deleteFunc = jest.fn();
            const component = shallow(<ADD2CharacterDetails onDelete={deleteFunc} selectedChar={{id: 1}}/>);
            const button = component.find('button').first();

            button.simulate('click');

            expect(deleteFunc).toBeCalledWith(1);
        });
    });
});