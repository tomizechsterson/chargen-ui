import React from 'react';
import {mount} from 'enzyme';
import ADD2CharacterCreation from '../ADD2CharacterCreation';
import ADD2StatRoll from "../ADD2StatRoll";
// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
describe('ADD2 Character Creation Tests', () => {
    let props;
    let mountedADD2CharacterCreation;
    const characterCreation = () => {
        if(!mountedADD2CharacterCreation) {
            mountedADD2CharacterCreation = mount(<ADD2CharacterCreation {...props}/>);
        }
        return mountedADD2CharacterCreation;
    };

    beforeEach(() => {
        props = {selectedChar: {completionStep: 0}};
        mountedADD2CharacterCreation = undefined;
    });

    it('always renders a div', () => {
        const divs = characterCreation().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });

    it('always renders an `h3` with the character name', () => {
        props.selectedChar = {name: 'test', completionStep: 0};
        expect(characterCreation().find('h3').text()).toEqual('test');
    });

    it('always renders an `ADD2StatRoll` (assuming completionStep is < 2', () => {
        expect(characterCreation().find(ADD2StatRoll).length).toBe(1);
    });

    describe('when `onUpdate` is defined', () => {
        beforeEach(() => {
            props.onUpdate = jest.fn();
        });

        it('sets the rendered `ADD2StatRoll`s `onUpdate` prop to the same value as `onUpdate`', () => {
            const add2StatRoll = characterCreation().find(ADD2StatRoll);
            expect(add2StatRoll.props().onUpdate).toBe(props.onUpdate);
        });
    });

    describe('when `onUpdate` is undefined', () => {
        beforeEach(() => {
            props.onUpdate = undefined;
        });

        it('sets the rendered `ADD2StatRoll`s `onUpdate` prop to undefined', () => {
            const add2StatRoll = characterCreation().find(ADD2StatRoll);
            expect(add2StatRoll.props().onUpdate).not.toBeDefined();
        });
    });

    describe('when `selectedChar` is defined', () => {
        beforeEach(() => {
            props.selectedChar = {completionStep: 0};
        });

        it('sets the rendered `ADD2StatRoll`s `selectedChar` prop to the same value as `selectedChar`', () => {
            const add2StatRoll = characterCreation().find(ADD2StatRoll);
            expect(add2StatRoll.props().selectedChar).toBe(props.selectedChar);
        });
    });
});