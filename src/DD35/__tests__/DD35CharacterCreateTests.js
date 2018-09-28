import React from 'react';
import {shallow} from 'enzyme';
import DD35CharacterCreate from "../DD35CharacterCreate";

describe('DD35 Character Create tests', () => {
    it('Renders expected things', () => {
        const component = shallow(<DD35CharacterCreate/>);
        expect(component.find('button')).toHaveLength(1);
    });

    describe('Closing Edit Component', () => {
        it('calls onClose from props', () => {
            const closeFn = jest.fn();
            const component = shallow(<DD35CharacterCreate onClose={closeFn}/>);
            const closeButton = component.find('button');

            closeButton.simulate('click');

            expect(closeFn).toHaveBeenCalledTimes(1);
        });
    });
});