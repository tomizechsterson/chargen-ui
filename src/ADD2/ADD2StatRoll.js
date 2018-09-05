import React, {Component} from 'react';
import RollOnce from '../StatRollRules/RollOnce';
import RollTwice from '../StatRollRules/RollTwice';
import RollFour from '../StatRollRules/RollFour';
import Assignment from '../StatRollRules/Assignment';
import Add7Dice from "../StatRollRules/Add7Dice";
import Urls from "../ApiUrls";

export default class ADD2StatRoll extends Component {
    constructor(props) {
        super(props);

        this.state = {rollRule: 'rollOnce'};

        this.handleRollRuleChange = this.handleRollRuleChange.bind(this);
    }

    handleRollRuleChange(e) {
        this.setState({rollRule: e.target.value});
    }

    setSelectedCharStatsTo8() {
        const {selectedChar} = this.props;
        selectedChar.str = selectedChar.dex = selectedChar.con =
            selectedChar.int = selectedChar.wis = selectedChar.chr = 8;
        return selectedChar;
    }

    render() {
        const {selectedChar, onUpdate, gateway} = this.props;
        const {rollRule} = this.state;
        const apiUrl = Urls.ADD2Url();
        return(
            <div>
                <label>Stat rolling rule:</label>
                <select value={rollRule} onChange={this.handleRollRuleChange}>
                    <option value='rollOnce'>Roll Once</option>
                    <option value='rollTwice'>Roll Twice</option>
                    <option value='assignment'>Stat Assignment</option>
                    <option value='assignment2x'>Double Stat Assignment</option>
                    <option value='roll4'>Roll 4 dice</option>
                    <option value='add7Dice'>Add 7 Dice to 8</option>
                </select>
                {rollRule === 'rollOnce' &&
                <RollOnce selectedChar={selectedChar} onUpdate={onUpdate} gateway={gateway} />}
                {rollRule === 'rollTwice' &&
                <RollTwice selectedChar={selectedChar} onUpdate={onUpdate} gateway={gateway} />}
                {rollRule === 'assignment' &&
                <Assignment selectedChar={selectedChar} onUpdate={onUpdate} double={false} gateway={gateway} />}
                {rollRule === 'assignment2x' &&
                <Assignment selectedChar={selectedChar} onUpdate={onUpdate} double={true} gateway={gateway} />}
                {rollRule === 'roll4' &&
                <RollFour selectedChar={selectedChar} onUpdate={onUpdate} apiUrl={apiUrl} />}
                {rollRule === 'add7Dice' &&
                <Add7Dice selectedChar={this.setSelectedCharStatsTo8()} onUpdate={onUpdate} apiUrl={apiUrl} />}
            </div>
        );
    }
}