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

    handleHWA() {
        const {selectedChar, gateway} = this.props;
        gateway.getHWA(selectedChar.race, selectedChar.gender, function(response) {
            this.setState({height: response[0], weight: response[1], age: response[2]});
        }.bind(this), function(error) {
            console.error(error);
        });
    }

    handleHPGP() {
        const {selectedChar, gateway} = this.props;
        const {moveRate} = this.state;
        gateway.getHPGP(selectedChar.className, function(response) {
            this.setState({hp: response[0], funds: response[1]});
        }.bind(this), function(error) {
            console.error(error);
        });

        if(!moveRate) {
            gateway.getFinalAttributes(selectedChar.race, selectedChar.className, function(response) {
                this.setState({moveRate: response[0], paralyze: response[1], rod: response[2], petrification: response[3],
                breath: response[4], spell: response[5]});
            }.bind(this), function(error) {
                console.error(error);
            });
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