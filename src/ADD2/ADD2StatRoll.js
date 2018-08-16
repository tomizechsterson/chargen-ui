import React, {Component} from 'react';
import RollOnce from '../StatRollRules/RollOnce';
import RollTwice from '../StatRollRules/RollTwice';
import RollFour from '../StatRollRules/RollFour';
import GeneralAssignment from '../StatRollRules/GeneralAssignment';

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
                <RollOnce selectedChar={selectedChar} onUpdate={this.props.onUpdate} />}
                {this.state.rollRule === 'rollTwice' &&
                <RollTwice selectedChar={selectedChar} onUpdate={this.props.onUpdate} />}
                {this.state.rollRule === 'assignment' &&
                <GeneralAssignment selectedChar={selectedChar} onUpdate={this.props.onUpdate} double={false} />}
                {this.state.rollRule === 'assignment2x' &&
                <GeneralAssignment selectedChar={selectedChar} onUpdate={this.props.onUpdate} double={true} />}
                {this.state.rollRule === 'roll4' &&
                <RollFour selectedChar={selectedChar} onUpdate={this.props.onUpdate} />}
                {this.state.rollRule === 'add7Dice' &&
                <p>Start at 8 and add 7 dice</p>}
            </div>
        );
    }
}