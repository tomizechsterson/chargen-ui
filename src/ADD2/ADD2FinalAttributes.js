import React, {Component} from 'react';

export default class ADD2FinalAttributes extends Component {
    constructor(props) {
        super(props);

        this.handleHWA = this.handleHWA.bind(this);
        this.handleHPGP = this.handleHPGP.bind(this);
    }

    handleHWA() {
        const {selectedChar, gateway} = this.props;
        gateway.getHWA(selectedChar.race, selectedChar.gender, function(response) {
            selectedChar.height = response[0];
            selectedChar.weight = response[1];
            selectedChar.age = response[2];
        }.bind(this), function(error) {
            console.error(error);
        });
    }

    handleHPGP() {
        const {selectedChar, gateway} = this.props;
        gateway.getHPGP(selectedChar.className, function(response) {
            selectedChar.hp = response[0];
            selectedChar.funds = response[1];
        }.bind(this), function(error) {
            console.error(error);
        });
    }

    render() {
        const {selectedChar} = this.props;
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
                CHR: {selectedChar.chr} <br/>
                Race: {selectedChar.race} Gender: {selectedChar.gender}
                Class: {selectedChar.className} Alignment: {selectedChar.alignment} <br/>
                Age: {selectedChar.age} Height: {feet(selectedChar.height)}'{inches(selectedChar.height)}" Weight: {selectedChar.weight} <br/>
                HP: {selectedChar.hp} Funds: {selectedChar.funds} gp <br/>
                <button onClick={this.handleHWA}>Re-roll Height/Weight/Age</button>
                <button onClick={this.handleHPGP}>Re-roll HP/GP</button>
            </div>
        );
    }
}