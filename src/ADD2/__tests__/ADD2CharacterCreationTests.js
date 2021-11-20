import React from 'react';
import {shallow} from 'enzyme';
import ADD2CharacterCreation from '../ADD2CharacterCreation';
import ADD2StatRoll from "../ADD2StatRoll";
import ADD2RaceSelection from "../ADD2RaceSelection";
import ADD2ClassSelection from "../ADD2ClassSelection";
import ADD2AlignmentSelection from "../ADD2AlignmentSelection";
import ADD2FinalAttributes from "../ADD2FinalAttributes";

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

    it('always renders the character name', () => {
        props.selectedChar = {name: 'testName'};
        expect(characterCreation().text()).toContain('testName');
    });

    it('renders an `ADD2StatRoll` if completionStep is 1', () => {
        expect(characterCreation().find(ADD2StatRoll)).toHaveLength(1);
    });

    it('renders an `ADD2RaceSelection` if completionStep is 2', () => {
        props.selectedChar = {completionStep: 2};
        expect(characterCreation().find(ADD2RaceSelection)).toHaveLength(1);
    });

    it('renders an `ADD2ClassSelection` if completionStep is 3', () => {
        props.selectedChar = {completionStep: 3};
        expect(characterCreation().find(ADD2ClassSelection)).toHaveLength(1);
    });

    it('renders an `ADD2AlignmentSelection` if completionStep is 4', () => {
        props.selectedChar = {completionStep: 4};
        expect(characterCreation().find(ADD2AlignmentSelection)).toHaveLength(1);
    });

    it('renders an `ADD2FinalAttributes` if completionStep is 5', () => {
        props.selectedChar = {completionStep: 5};
        expect(characterCreation().find(ADD2FinalAttributes)).toHaveLength(1);
    });

    describe('when `onUpdate` is defined', () => {
        it('sets the rendered `ADD2StatRoll`s `onUpdate` prop to the same value as `onUpdate`', () => {
            props.onUpdate = jest.fn();
            const add2StatRoll = characterCreation().find(ADD2StatRoll);
            expect(add2StatRoll.props().onUpdate).toBe(props.onUpdate);
        });

        it('sets the rendered `ADD2RaceSelection`s `onUpdate` prop to the expected function', () => {
            props.onUpdate = jest.fn();
            props.selectedChar = {completionStep: 2};
            const raceSelection = characterCreation().find(ADD2RaceSelection);
            expect(raceSelection.props().onUpdate).toBe(props.onUpdate);
        });

        it('sets the rendered `ADD2ClassSelection`s `onUpdate` prop to the expected function', () => {
            props.onUpdate = jest.fn();
            props.selectedChar = {completionStep: 3};
            const classSelection = characterCreation().find(ADD2ClassSelection);
            expect(classSelection.props().onUpdate).toBe(props.onUpdate);
        });

        it('sets the rendered `ADD2AlignmentSelection`s `onUpdate` prop to the expected function', () => {
            props.onUpdate = jest.fn();
            props.selectedChar = {completionStep: 4};
            const alignmentSelection = characterCreation().find(ADD2AlignmentSelection);
            expect(alignmentSelection.props().onUpdate).toBe(props.onUpdate);
        });

        it('sets the rendered `ADD2FinalAttributes`s `onUpdate` prop to the expected function', () => {
            props.onUpdate = jest.fn();
            props.selectedChar = {completionStep: 5};
            const finalAttributes = characterCreation().find(ADD2FinalAttributes);
            expect(finalAttributes.props().onUpdate).toBe(props.onUpdate);
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
            const add2StatRoll = characterCreation().find(ADD2StatRoll);
            expect(add2StatRoll.props().selectedChar).toBe(props.selectedChar);
        });

        it('sets the selectedChar prop of the ADD2RaceSelection component', () => {
            props.selectedChar = {completionStep: 2};
            const raceSelection = characterCreation().find(ADD2RaceSelection);
            expect(raceSelection.props().selectedChar).toBe(props.selectedChar);
        });

        it('sets the selectedChar prop of the ADD2ClassSelection component', () => {
            props.selectedChar = {completionStep: 3};
            const classSelection = characterCreation().find(ADD2ClassSelection);
            expect(classSelection.props().selectedChar).toBe(props.selectedChar);
        });

        it('sets the selectedChar prop of the ADD2AlignmentSelection component', () => {
            props.selectedChar = {completionStep: 4};
            const alignmentSelection = characterCreation().find(ADD2AlignmentSelection);
            expect(alignmentSelection.props().selectedChar).toBe(props.selectedChar);
        });

        it('sets the selectedChar prop of the ADD2FinalAttributes component', () => {
            props.selectedChar = {completionStep: 5};
            const finalAttributes = characterCreation().find(ADD2FinalAttributes);
            expect(finalAttributes.props().selectedChar).toBe(props.selectedChar);
        });
    });
});
