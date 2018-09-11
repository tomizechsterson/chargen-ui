import React from 'react';
import {shallow} from 'enzyme';
import ADD2CharacterTable from '../ADD2CharacterTable';

describe('ADD2CharacterTable', () => {
    it('renders a table element if at least one character is in the collection', () => {
        const component = shallow(<ADD2CharacterTable characters={[{id: 1}]}/>);
        expect(component.find('table')).toHaveLength(1);
    });

    describe('when there is data', () => {
        it('renders the expected number of rows', () => {
            const testData = [{id: 1}, {id: 2}];
            const component = shallow(<ADD2CharacterTable characters={testData}/>);
            expect(component.find('tbody tr')).toHaveLength(2);
        });

        it('renders a p tag if there is no data', () => {
            const component = shallow(<ADD2CharacterTable characters={[]}/>);
            expect(component.find('tbody tr')).toHaveLength(0);
            expect(component.find('p')).toHaveLength(1);
        });

        it('renders Yes or No depending on if the character is completed', () => {
            const testData = [{id: 1, completionStep: 4}, {id: 2, completionStep: 3}, {id: 3, completionStep: 2}, {id: 4, completionStep: 1}];
            const component = shallow(<ADD2CharacterTable characters={testData}/>);

            expect(component.find('tbody tr').at(0).find('td').at(3).text()).toEqual('Yes');
            expect(component.find('tbody tr').at(1).find('td').at(3).text()).toEqual('No');
            expect(component.find('tbody tr').at(2).find('td').at(3).text()).toEqual('No');
            expect(component.find('tbody tr').at(3).find('td').at(3).text()).toEqual('No');
        });

        it('calls onSelect with the proper id when a row is clicked', () => {
            const testData = [{id: 1}, {id: 2}];
            const select = jest.fn();
            const component = shallow(<ADD2CharacterTable characters={testData} onSelect={select}/>);
            const entryRows = component.find('tbody tr');

            entryRows.at(0).simulate('click');
            expect(select).toBeCalledWith(1);
            entryRows.at(1).simulate('click');
            expect(select).toBeCalledWith(2);
        });
    });
});