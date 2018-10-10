import React, {Component} from 'react';

export default class ADD2FinalAttributes extends Component {
    constructor(props) {
        super(props);

        this.state = {height: 0, weight: 0, age: 0, hp: 0, funds: 0, moveRate: 0,
        paralyze: 0, rod: 0, petrification: 0, breath: 0, spell: 0};

        this.handleHWA = this.handleHWA.bind(this);
        this.handleHPGP = this.handleHPGP.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async handleHWA() {
        const {selectedChar, gateway} = this.props;
        const hwa = await gateway.getHWA(selectedChar.race, selectedChar.gender);
        this.setState({height: hwa[0], weight: hwa[1], age: hwa[2]});
    }

    async handleHPGP() {
        const {selectedChar, gateway} = this.props;
        const {moveRate} = this.state;
        const hpgp = await gateway.getHPGP(selectedChar.className);
        this.setState({hp: hpgp[0], funds: hpgp[1]});

        if(!moveRate) {
            const data = await gateway.getFinalAttributes(selectedChar.race, selectedChar.className);
            this.setState({moveRate: data[0], paralyze: data[1], rod: data[2],
                petrification: data[3], breath: data[4], spell: data[5]});
        }
    }

    handleUpdate() {
        const {height, weight, age, funds, hp, moveRate,
            paralyze, rod, petrification, breath, spell} = this.state;
        const {selectedChar, onUpdate} = this.props;

        if(!height || !weight || !age || !funds || !hp)
            alert('must roll for all attributes to save');
        else {
            selectedChar.height = height;
            selectedChar.weight = weight;
            selectedChar.age = age;
            selectedChar.funds = funds;
            selectedChar.hp = hp;
            selectedChar.moveRate = moveRate;
            selectedChar.paralyze = paralyze;
            selectedChar.rod = rod;
            selectedChar.petrification = petrification;
            selectedChar.breath = breath;
            selectedChar.spell = spell;
            selectedChar.completionStep++;
            onUpdate(selectedChar);
        }
    }

    render() {
        const {selectedChar} = this.props;
        const {height, weight, age, funds, hp, moveRate,
            paralyze, rod, petrification, breath, spell} = this.state;
        const feet = (inches) => {
            return Math.trunc(inches / 12);
        };
        const inches = (total) => {
            return total % 12;
        };

        return (
            <div>
                STR: {selectedChar.str} <br/>
                DEX: {selectedChar.dex} <br/>
                CON: {selectedChar.con} <br/>
                INT: {selectedChar.int} <br/>
                WIS: {selectedChar.wis} <br/>
                CHR: {selectedChar.chr} <br/> <br/>
                Race: {selectedChar.race} Gender: {selectedChar.gender} Class: {selectedChar.className} Alignment: {selectedChar.alignment} <br/> <br/>
                Age: {age} Height: {feet(height)}'{inches(height)}" Weight: {weight} <br/>
                HP: {hp} Funds: {funds} gp Movement Rate: {moveRate} <br/>
                <h4>Saving Throws</h4>
                Paralyzation, Poison, Death Magic: {paralyze} <br/>
                Rod, Staff, Wand: {rod} <br/>
                Petrification, Polymorph: {petrification} <br/>
                Breath Weapon: {breath} <br/>
                Spell: {spell} <br/>
                <button onClick={this.handleHWA}>Roll Height/Weight/Age</button>
                <button onClick={this.handleHPGP}>Roll HP/GP</button>
                <button onClick={this.handleUpdate}>Save</button>
            </div>
        );
    }
}