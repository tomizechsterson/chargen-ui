import React, {Component} from 'react';

export default class ADD2FinalAttributes extends Component {
    constructor(props) {
        super(props);

        this.state = {height: 0, weight: 0, age: 0, hp: 0, funds: 0};

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
        gateway.getHPGP(selectedChar.className, function(response) {
            this.setState({hp: response[0], funds: response[1]});
        }.bind(this), function(error) {
            console.error(error);
        });
    }

    handleUpdate() {
        const {height, weight, age, funds, hp} = this.state;
        const {selectedChar, onUpdate} = this.props;

        if(!height || !weight || !age || !funds || !hp)
            alert('must roll for all attributes to save');
        else {
            selectedChar.height = height;
            selectedChar.weight = weight;
            selectedChar.age = age;
            selectedChar.funds = funds;
            selectedChar.hp = hp;
            selectedChar.completionStep++;
            onUpdate(selectedChar);
        }
    }

    render() {
        const {selectedChar} = this.props;
        const {height, weight, age, funds, hp} = this.state;
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
                Race: {selectedChar.race} Gender: {selectedChar.gender} Class: {selectedChar.className} Alignment: {selectedChar.alignment} <br/>
                Age: {age} Height: {feet(height)}'{inches(height)}" Weight: {weight} <br/>
                HP: {hp} Funds: {funds} gp <br/>
                <button onClick={this.handleHWA}>Roll Height/Weight/Age</button>
                <button onClick={this.handleHPGP}>Roll HP/GP</button>
                <button onClick={this.handleUpdate}>Save</button>
            </div>
        );
    }
}