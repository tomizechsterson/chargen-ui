import React, {Component} from 'react';

export default class Assignment2xDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedStat: '', selectedRoll: undefined};
    }

    render() {
        const {selectedChar} = this.props;
        const {rolls} = this.props;
        const rollsStyle = {
            color: '#999'
        };

        let roll0 = undefined, roll1 = undefined, roll2 = undefined, roll3 = undefined,
            roll4 = undefined, roll5 = undefined, roll6 = undefined, roll7 = undefined,
            roll8 = undefined, roll9 = undefined, roll10 = undefined, roll11 = undefined;
        let selectedRollText = '';
        if(this.state.selectedRoll)
            selectedRollText = this.state.selectedRoll.value;

        if(this.props.rolls.length > 0) {
            roll0 = rolls[0]; roll1 = rolls[1]; roll2 = rolls[2]; roll3 = rolls[3];
            roll4 = rolls[4]; roll5 = rolls[5]; roll6 = rolls[6]; roll7 = rolls[7];
            roll8 = rolls[8]; roll9 = rolls[9]; roll10 = rolls[10]; roll11 = rolls[11];
        }

        return (
            <div>
                Selected Stat: {this.state.selectedStat}, Selected Roll: {selectedRollText} <br/>

                <input type='button' onClick={() => this.handleSelectStat('STR')} value='STR' /> {selectedChar.str}
                {roll0 && <input type='button' onClick={() => this.handleSelectRoll(roll0)} value={roll0.value} disabled={roll0.assigned} />}
                {roll0 && <span style={rollsStyle}>{roll0.text}</span>}
                {roll1 && <input type='button' onClick={() => this.handleSelectRoll(roll1)} value={roll1.value} disabled={roll1.assigned} />}
                {roll1 && <span style={rollsStyle}>{roll1.text}</span>}<br/>
                <input type='button' onClick={() => this.handleSelectStat('DEX')} value='DEX' /> {selectedChar.dex}
                {roll2 && <input type='button' onClick={() => this.handleSelectRoll(roll2)} value={roll2.value} disabled={roll2.assigned} />}
                {roll2 && <span style={rollsStyle}>{roll2.text}</span>}
                {roll3 && <input type='button' onClick={() => this.handleSelectRoll(roll3)} value={roll3.value} disabled={roll3.assigned} />}
                {roll3 && <span style={rollsStyle}>{roll3.text}</span>}<br/>
            </div>
        );
    }
}