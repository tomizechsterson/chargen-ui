import React from 'react';
import {shallow} from 'enzyme';
import RollSelector from '../RollSelector';

describe('RollSelector tests', () => {
    it('renders a top-level div and 7 roll buttons', () => {
        const component = shallow(<RollSelector rolls={getTestRolls()}/>);
        expect(component.find('div')).toHaveLength(1);
        expect(component.find('button')).toHaveLength(7);
    });

    describe('roll selection', () => {
        let component, selectRollFunc;
        beforeEach(() => {
            selectRollFunc = jest.fn();
            component = shallow(<RollSelector onSelectRoll={selectRollFunc} rolls={getTestRolls()}/>);
        });
        it('calls onSelectRoll with the expected object', () => {
            component.find('button').at(0).simulate('click');

            expect(selectRollFunc).toHaveBeenCalledTimes(1);
            expect(selectRollFunc).toHaveBeenCalledWith(getTestRolls()[0]);
        });

        it('has the expected value for the roll selection button', () => {
            expect(component.find('button').at(6).text()).toContain('1');
        });

        it('disables the roll selection button if the roll is assigned', () => {
            expect(component.find('button').at(2).html()).toContain('disabled=""');
            expect(component.find('button').at(3).html()).toContain('disabled=""');
            expect(component.find('button').at(4).html()).toContain('disabled=""');
            expect(component.find('button').at(5).html()).toContain('disabled=""');
        });

        it('enables the roll selection button if the roll is not assigned', () => {
            expect(component.find('button').at(0).html()).not.toContain('disabled=""');
            expect(component.find('button').at(1).html()).not.toContain('disabled=""');
            expect(component.find('button').at(6).html()).not.toContain('disabled=""');
        });
    });

    const getTestRolls = () => {
        return [{id: 1, value: 1, assigned: false}, {id: 2, value: 2, assigned: false},
            {id: 3, value: 3, assigned: true}, {id: 4, value: 4, assigned: true},
            {id: 5, value: 5, assigned: true}, {id: 6, value: 6, assigned: true},
            {id: 7, value: 1, assigned: false}];
    };
});
