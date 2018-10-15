import React from 'react';
import {shallow} from 'enzyme';
import ADD2FinalAttributes from '../ADD2FinalAttributes';

describe('ADD2 Final Attributes Tests', () => {
    it('renders stats of selected character', () => {
        const testChar = {str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8};
        const component = shallow(<ADD2FinalAttributes selectedChar={testChar}/>);
        expect(component.text()).toContain('STR: 3');
        expect(component.text()).toContain('DEX: 4');
        expect(component.text()).toContain('CON: 5');
        expect(component.text()).toContain('INT: 6');
        expect(component.text()).toContain('WIS: 7');
        expect(component.text()).toContain('CHR: 8');
    });

    it('renders the rest of the attributes of the selected character', () => {
        const testChar = {race: 'testRace', gender: 'F', className: 'testClass', alignment: 'testAlignment'};
        const component = shallow(<ADD2FinalAttributes selectedChar={testChar}/>);
        expect(component.text()).toContain('Race: testRace');
        expect(component.text()).toContain('Gender: F');
        expect(component.text()).toContain('Class: testClass');
        expect(component.text()).toContain('Alignment: testAlignment');
    });

    it('renders all the attributes from state', () => {
        const component = shallow(<ADD2FinalAttributes selectedChar={{}}/>);
        component.setState({height: 67, weight: 120, age: 25, hp: 10, funds: 120, moveRate: 9,
            paralyze: 10, rod: 11, petrification: 12, breath: 13, spell: 14});
        expect(component.text()).toContain('Height: 5\'7"');
        expect(component.text()).toContain('Weight: 120');
        expect(component.text()).toContain('Age: 25');
        expect(component.text()).toContain('HP: 10');
        expect(component.text()).toContain('Funds: 120 gp');
        expect(component.text()).toContain('Paralyzation, Poison, Death Magic: 10');
        expect(component.text()).toContain('Rod, Staff, Wand: 11');
        expect(component.text()).toContain('Petrification, Polymorph: 12');
        expect(component.text()).toContain('Breath Weapon: 13');
        expect(component.text()).toContain('Spell: 14');
        expect(component.text()).toContain('Movement Rate: 9');
    });

    describe('Roll Vitals Buttons', () => {
        let component;
        function mockGateway() {return {getHWA: () => {return [70, 150, 25]}, getHPGP: () => {return [7, 90]},
            getFinalAttributes: () => {return [1, 2, 3, 4, 5, 6]}}}
        beforeEach(() => {
            component = shallow(<ADD2FinalAttributes selectedChar={{}} gateway={mockGateway()}/>);
        });

        function tick() {
            return new Promise(resolve => {setTimeout(resolve, 0)})
        }

        it('HWA button updates the height, weight, and age of the selected character', async () => {
            component.find('button').at(0).simulate('click');
            await tick();

            expect(component.state().height).toBe(70);
            expect(component.state().weight).toBe(150);
            expect(component.state().age).toBe(25);
        });

        it('Hp/Gp button updates the HP and starting funds of the selected character', async () => {
            component.find('button').at(1).simulate('click');
            await tick();

            expect(component.state().hp).toBe(7);
            expect(component.state().funds).toBe(90);
        });

        it('if move rate != 0, does not update the move rate and saving throws', async () => {
            component.setState({moveRate: 1, paralyze: 9, rod: 9, petrification: 9, breath: 9, spell: 9});
            component.find('button').at(1).simulate('click');
            await tick();

            expect(component.state().moveRate).toBe(1);
            expect(component.state().paralyze).toBe(9);
            expect(component.state().rod).toBe(9);
            expect(component.state().petrification).toBe(9);
            expect(component.state().breath).toBe(9);
            expect(component.state().spell).toBe(9);
        });
    });

    describe('Save Button', () => {
        let updateFunc, component;
        beforeEach(() => {
            updateFunc = jest.fn();
            component = shallow(<ADD2FinalAttributes onUpdate={updateFunc} selectedChar={{completionStep: 5}}/>);
        });

        it('does not call onUpdate if any attribute has not been rolled', () => {
            component.setState({height: 0, weight: 0, age: 0, hp: 0, funds: 0});

            component.find('button').at(2).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(0);
        });

        it('calls onUpdate with the expected attributes and increments completionStep', () => {
            component.setState({height: 1, weight: 2, age: 3, hp: 4, funds: 5,
                moveRate: 1, paralyze: 9, rod: 9, petrification: 9, breath: 9, spell: 9});

            component.find('button').at(2).simulate('click');

            expect(updateFunc).toHaveBeenCalledTimes(1);
            expect(updateFunc).toHaveBeenCalledWith({'age': 3, 'completionStep': 6, 'funds': 5, 'height': 1, 'hp': 4, 'weight': 2,
            'moveRate': 1, 'paralyze': 9, 'rod': 9, 'petrification': 9, 'breath': 9, 'spell': 9});
        });
    });
});