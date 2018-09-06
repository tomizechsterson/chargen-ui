import React from 'react';
import {shallow} from 'enzyme';
import ADD2CharacterCreation from '../ADD2CharacterCreation';
import ADD2StatRoll from "../ADD2StatRoll";

describe('ADD2CharacterCreation Tests', () => {
    let props;
    let mountedADD2CharacterCreation;
    const characterCreation = () => {
        if(!mountedADD2CharacterCreation) {
            mountedADD2CharacterCreation = shallow(<ADD2CharacterCreation {...props}/>);
        }
        return mountedADD2CharacterCreation;
    };

    beforeEach(() => {
        props = {selectedChar: {completionStep: 1}};
        mountedADD2CharacterCreation = undefined;
    });

    it('always renders a div', () => {
        const divs = characterCreation().find('div');
        expect(divs.length).toBeGreaterThan(0);
    });

    it('always renders the character name', () => {
        props.selectedChar = {name: 'testName', completionStep: 1};
        expect(characterCreation().text()).toContain('testName');
    });

    it('always renders an `ADD2StatRoll` (assuming completionStep is < 2)', () => {
        expect(characterCreation().find(ADD2StatRoll)).toHaveLength(1);
    });

    describe('when `onUpdate` is defined', () => {
        it('sets the rendered `ADD2StatRoll`s `onUpdate` prop to the same value as `onUpdate`', () => {
            props.onUpdate = jest.fn();
            const add2StatRoll = characterCreation().find(ADD2StatRoll);
            expect(add2StatRoll.props().onUpdate).toBe(props.onUpdate);
        });
    });

    describe('when `onUpdate` is undefined', () => {
        it('sets the rendered `ADD2StatRoll`s `onUpdate` prop to undefined', () => {
            props.onUpdate = undefined;
            const add2StatRoll = characterCreation().find(ADD2StatRoll);
            expect(add2StatRoll.props().onUpdate).not.toBeDefined();
        });
    });

    describe('when `selectedChar` is defined', () => {
        it('sets the rendered `ADD2StatRoll`s `selectedChar` prop to the same value as `selectedChar`', () => {
            props.selectedChar = {completionStep: 1};
            const add2StatRoll = characterCreation().find(ADD2StatRoll);
            expect(add2StatRoll.props().selectedChar).toBe(props.selectedChar);
        });
    });
});