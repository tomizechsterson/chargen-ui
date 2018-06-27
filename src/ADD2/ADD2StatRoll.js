import React, {Component} from 'react';
import RollOnce from '../StatRollRules/RollOnce';

export default class ADD2StatRoll extends Component {
    constructor(props) {
        super(props);

        this.state = {rollRule: 'rollOnce'};

        this.handleRollRuleChange = this.handleRollRuleChange.bind(this);
    }

    handleRollRuleChange(e) {
        this.setState({rollRule: e.target.value});
    }

    render() {
        const {selectedChar} = this.props;
        return(
            <div>
                <label>Stat rolling rule:</label>
                <select value={this.state.rollRule} onChange={this.handleRollRuleChange}>
                    <option value='rollOnce'>Roll Once</option>
                    <option value='rollTwice'>Roll Twice</option>
                    <option value='assignment'>Stat Assignment</option>
                    <option value='assignment2x'>Double Stat Assignment</option>
                    <option value='roll4'>Roll 4 dice</option>
                    <option value='add7Dice'>Add 7 Dice to 8</option>
                </select>
                {this.state.rollRule === 'rollOnce' &&
                <RollOnce selectedChar={selectedChar} onCharacterUpdate={this.props.onCharacterUpdate} />}
                {this.state.rollRule === 'rollTwice' &&
                <p>Roll each stat twice and pick the higher one</p>}
                {this.state.rollRule === 'assignment' &&
                <p>Assign 6 rolls to stats</p>}
                {this.state.rollRule === 'assignment2x' &&
                <p>Roll 12 and assign 6 to stats</p>}
                {this.state.rollRule === 'roll4' &&
                <p>Roll 4 dice and discard the lowers roll</p>}
                {this.state.rollRule === 'add7Dice' &&
                <p>Start at 8 and add 7 dice</p>}
            </div>
        );
    }
}