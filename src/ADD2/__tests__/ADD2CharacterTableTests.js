import React from 'react';
import {shallow} from 'enzyme';
import ADD2CharacterTable from '../ADD2CharacterTable';

describe('ADD2CharacterTable', () => {
    it('always renders a table element', () => {
        const component = shallow(<ADD2CharacterTable characters={[]}/>);
        expect(component.find('table')).toHaveLength(1);
    });

    describe('when there is data', () => {
        it('renders the expected number of rows', () => {
            const testData = [{id: 1}, {id: 2}];
            const component = shallow(<ADD2CharacterTable characters={testData}/>);
            expect(component.find('tbody tr')).toHaveLength(2);
        });

        it('renders Yes or No depending on if the character is completed', () => {
            const testData = [{id: 1, completionStep: 2}, {id: 2, completionStep:1}];
            const component = shallow(<ADD2CharacterTable characters={testData}/>);

            expect(component.find('tbody tr').at(0).find('td').at(3).text()).toEqual('Yes');
            expect(component.find('tbody tr').at(1).find('td').at(3).text()).toEqual('No');
        });
    });
});